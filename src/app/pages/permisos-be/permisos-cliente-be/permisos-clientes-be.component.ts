import { Component } from '@angular/core';
import { GestionGenericaService } from '../../../shared/service/gestion';
import { environment } from '../../../../environments/environment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { AdministracionRolesComponent } from '../../../pages/configuracion/rol-menu/admin-usuarios/modal-roles/admin-roles.component';
import { verificacionModalComponent } from '../../../pages/modales/verificacion-modal/verificacion-modal.component';

/**
 * @autor: Carlos Eduardo Mata Rojas
 * @version: 1.0.0
 * @fecha: 05/06/2023
 * @descripcion: asigna permisos por el rol de la banca electronica
 */

export class TodoItemNode {
  submenus: TodoItemNode[];
  menu_id: number;
  titulo: string;
  cvemenu: string;
  descripcion: string;
  pathurl: string;
  menu_padre_id: number;
  icon: string;
  estatus: boolean;
}

/** Flat node with expandable and level information */
export class MenuNode {
  menu_id: number;
  titulo: string;
  cvemenu: string;
  descripcion: string;
  pathurl: string;
  menu_padre_id: number;
  icon: string;
  estatus: boolean;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'permisos-clientes-be',
  templateUrl: './permisos-clientes-be.component.html',
  styleUrls: [],
})
export class PermisosClientesBeComponent {
  //Declaracion de variables y Componentes
  listaRolesBe: any = [];
  showRol: boolean = false;
  rol = '';
  rolid = 0;
  accion: number;
  titulo: string;
  listMenus: any = [];
  listaPermisos: any = [];
  arbolAltaPermisos: any;
  categoria = environment.categorias.catRol;
  @BlockUI() blockUI: NgBlockUI;

  //### Configuracion Arbol MenusComponent
  /** Arbol Servidores */
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<MenuNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, MenuNode>();

  treeControl: FlatTreeControl<MenuNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, MenuNode>;
  dataSourceMenus: MatTreeFlatDataSource<TodoItemNode, MenuNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<MenuNode>(true /* multiple */);

  //## FIN COnfiguracion Arbol

  constructor(
    private service: GestionGenericaService,
    public dialog: MatDialog
  ) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<MenuNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSourceMenus = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    // Se obtienen los menús en forma de árbol
    this.service
      .getListByObjet({ datos: {}, accion: 1 }, 'jsonMenusBe')
      .subscribe(
        (data) => {
          const res = data.info;
          this.treeControl = new FlatTreeControl<MenuNode>(
            this.getLevel,
            this.isExpandable
          );
          this.dataSourceMenus = new MatTreeFlatDataSource(
            this.treeControl,
            this.treeFlattener
          );

          this.dataSourceMenus.data = res;
          this.arbolAltaPermisos = res;
          this.blockUI.stop();
        },
        (error) => {
          this.blockUI.stop();
          this.service.showNotification('top', 'right', 4, error.Message);
        }
      );
  }

  getLevel = (node: MenuNode) => node.level;

  isExpandable = (node: MenuNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.submenus;

  hasChild = (_: number, _nodeData: MenuNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: MenuNode) => _nodeData.titulo === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.titulo === node.titulo
        ? existingNode
        : new MenuNode();
    flatNode.menu_id = node.menu_id;
    flatNode.titulo = node.titulo;
    flatNode.cvemenu = node.cvemenu;
    flatNode.descripcion = node.descripcion;
    flatNode.pathurl = node.pathurl;
    flatNode.menu_padre_id = node.menu_padre_id;
    flatNode.icon = node.icon;
    flatNode.estatus = node.estatus;
    flatNode.level = level;
    flatNode.expandable = !!node.submenus?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /**
   * Método Onit de Angular
   * Llama al método encargado de cargar los roles de BE
   */
  ngOnInit() {
    this.spsRolesBe();
  }

  /**
   * Metodo para obtener el Json para formar el Arbol de Menus
   */
  spsJsonMenu() {
    this.blockUI.start('Cargando datos...');

    this.service
      .getListByObjet({ datos: {}, accion: 1 }, 'jsonMenusBe')
      .subscribe(
        (data) => {
          const res = data.info;
          this.dataSourceMenus.data = res;
          this.blockUI.stop();
        },
        (error) => {
          this.blockUI.stop();
          this.service.showNotification('top', 'right', 4, error.Message);
        }
      );
  }

  /**
   * Metodo para gestionar los permisos del rol
   * @param elemento - Elemento a gestionar
   */
  gestionRol(elemento) {
    console.log(elemento);

    console.log(elemento.generales_id);

    this.listaPermisos = [];
    this.checklistSelection = new SelectionModel<MenuNode>(true /* multiple */);

    this.service
      .getListByObjet(
        {
          datos: { rolId: elemento.generales_id },
          accion: 1,
        },
        'spsPermisosRolBe'
      )
      .subscribe(
        (data) => {
          this.listaPermisos = data.info;
          console.log(data.info);
          for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
            for (let per of this.listaPermisos) {
              if (per.pathurl) {
                if (this.treeControl.dataNodes[i].titulo === per.titulo) {
                  this.todoItemSelectionToggle(this.treeControl.dataNodes[i]);
                  this.treeControl.expand(this.treeControl.dataNodes[i]);
                }
              }
            }
          }
          this.blockUI.stop();
        },
        (error) => {
          this.blockUI.stop();
          this.service.showNotification('top', 'right', 4, error.Message);
        }
      );
    this.rol = elemento.descripcion;
    this.rolid = elemento.generales_id;
    this.showRol = true;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: MenuNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: MenuNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: MenuNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
    // Force update for the parent
    descendants.forEach((child) => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: MenuNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: MenuNode): void {
    let parent: MenuNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: MenuNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: MenuNode): MenuNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /**
   * Metodo para abrir ventana modal
   * @param data -- Objecto o valor a condicionar
   */

  openDialog(data) {
    //Si es 0 es Registrar si es diferente es actualizar
    if (data === 0) {
      this.titulo = 'Registrar';
      this.accion = 1;
    } else {
      this.titulo = 'Editar';
      this.accion = 2;
    }
    //se abre el modal
    const dialogRef = this.dialog.open(AdministracionRolesComponent, {
      width: '600px',
      data: {},
    });
    //Se usa para cuando cerramos
    dialogRef.afterClosed().subscribe((result) => {
      this.spsRolesBe();
    });
  }

  guardarPermisos() {
    this.listMenus = [];
    if (this.rolid === 0) {
      this.service.showNotification('top', 'right', 3, ' Elige un Rol');
      return false;
    }

    if (this.checklistSelection.selected.length === 0) {
      this.service.showNotification('top', 'right', 3, ' Elige un Menú');
      return false;
    }

    const dialogRef = this.dialog.open(verificacionModalComponent, {
      data: {
        titulo: 'Alta Permisos',
        body:
          '¿Esta seguro de asignarle los permisos al rol ' + this.rol + ' ?',
      },
    });

    //Cerrar ventana
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 0) {
        this.blockUI.start('Guardando ...');

        for (let menu of this.checklistSelection.selected) {
          this.listMenus.push(menu.menu_id);
        }

        let data = {
          rolId: this.rolid,
          menus: this.listMenus,
        };

        console.log(data);

        this.service
          .registrar(
            {
              datos: data,
              accion: 1,
            },
            'crudPermisosRolBe'
          )
          .subscribe(
            (resultG) => {
              this.blockUI.stop();
              console.log(resultG);
              if (resultG.codigo === '0') {
                this.service.showNotification(
                  'top',
                  'right',
                  2,
                  resultG.mensaje
                );
              } else {
                this.service.showNotification(
                  'top',
                  'right',
                  3,
                  resultG.mensaje
                );
              }
            },
            (error) => {
              this.blockUI.stop();
              this.service.showNotification('top', 'right', 4, error.Message);
            }
          );
      }
    });
  }

  // filtrar recursivamente en una cadena de texto usando el valor del objeto de propiedad
  filterRecursive(filterText: string, array: any[], property: string) {
    let filteredData;
    //haga una copia de los datos para que no mutemos el original
    function copy(o: any) {
      return Object.assign({}, o);
    }

    // has string
    if (filterText) {
      // necesita la cadena para que coincida con el valor de la propiedad
      filterText = filterText.toLowerCase();
      // copy obj so we don't mutate it and filter
      filteredData = array.map(copy).filter(function x(y) {
        if (y[property].toLowerCase().includes(filterText)) {
          return true;
        }
        // if children match
        if (y.submenus) {
          return (y.submenus = y.submenus.map(copy).filter(x)).length;
        }
      });
      // no string, return whole array
    } else {
      filteredData = array;
    }
    return filteredData;
  }

  // pass mat input string to recursive function and return data
  filterTree(filterText: string) {
    // use filter input text, return filtered TREE_DATA, use the 'name' object value
    this.dataSourceMenus.data = this.filterRecursive(
      filterText,
      this.arbolAltaPermisos,
      'titulo'
    );
  }

  // filter string from mat input filter
  applyFilter(filterText: string) {
    this.filterTree(filterText);
    // show / hide based on state of filter string
    if (filterText) {
      this.treeControl.expandAll();
    } else {
      this.treeControl.collapseAll();
    }
  }

  /**
   * Metodo para listar los roles be
   */
  spsRolesBe() {
    console.log('ROLES BE');

    this.blockUI.start('Cargando datos...');

    this.service
      .getListByObjet(
        {
          datos: {},
          accion: 1,
        },
        'spsRolesBe'
      )
      .subscribe(
        (data) => {
          this.blockUI.stop();
          this.listaRolesBe = data.info;
          //console.log(data.info);
          console.log(this.listaRolesBe);
        },
        (error) => {
          this.blockUI.stop();
          this.service.showNotification('top', 'right', 4, error.Message);
        }
      );
  }
}
