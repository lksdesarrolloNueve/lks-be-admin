import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { GestionGenericaService } from '../../../shared/service/gestion';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { map, startWith } from 'rxjs/operators';

/** Flat node with expandable and level information */
interface MenuNode {
  expandable: boolean;
  menu_id: number;
  titulo: string;
  cvemenu: string;
  descripcion: string;
  pathurl: string;
  menu_padre_id: number;
  icono: string;
  estatus: boolean;
  level: number;
}

@Component({
  selector: 'alta-menu-cliente',
  templateUrl: './alta-menu-cliente.component.html',
  styleUrls: [],
})
export class AltaMenuClienteComponent {
  //Declaracion de variables y Componentes
  @BlockUI() blockUI: NgBlockUI;

  opcionesMenu: Observable<string[]>;
  listaMenus: any[] = [];
  formMenu: UntypedFormGroup;

  menu_id: number = 0;

  accion: number = 1;
  arbolMenus: any;

  //Botones boolean
  mostrarGuardar: boolean = true;
  mostrarEditar: boolean = false;

  //### Configuracion Arbol MenusComponent
  /** Arbol Servidores */
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.submenus && node.submenus.length > 0,
      menu_id: node.menu_id,
      titulo: node.titulo,
      cvemenu: node.cvemenu,
      descripcion: node.descripcion,
      pathurl: node.pathurl,
      menu_padre_id: node.menu_padre_id,
      icono: node.icon,
      estatus: node.estatus,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<MenuNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.submenus
  );

  dataSourceMenus = new MatTreeFlatDataSource(
    this.treeControl,
    this.treeFlattener
  );

  hasChild = (_: number, node: MenuNode) => node.expandable;

  //## FIN COnfiguracion Arbol

  constructor(
    private service: GestionGenericaService,
    private fomrBuilder: UntypedFormBuilder
  ) {
    this.formMenu = this.fomrBuilder.group({
      menu: new UntypedFormControl('', {
        validators: [this.autocompleteObjectValidator()],
      }),
      titulo: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      descripcion: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      icono: new UntypedFormControl('', [Validators.maxLength(30)]),
      pathurl: new UntypedFormControl('', [Validators.maxLength(20)]),
      estatus: new UntypedFormControl(true),
    });
  }

  ngOnInit() {
    this.spsJsonMenu();
    this.spsListaMenus();
  }

  /**
   * Metodo para obtener el Json para formar el Arbol de Menus
   */
  spsJsonMenu() {
    this.blockUI.start('Cargando datos...');

    this.service
      .getListByObjet(
        {
          datos: {},
          accion: 1,
        },
        'jsonMenusBe'
      )
      .subscribe(
        (data) => {
          this.blockUI.stop();
          // Guarda los menús (en forma de árbol en la constante res)
          const res = data.info;

          // Los menús se asignan al árbol del HTML
          this.dataSourceMenus.data = res;

          // Se guardan los menus
          this.arbolMenus = res;
        },
        (error) => {
          this.blockUI.stop();
          this.service.showNotification('top', 'right', 4, error.Message);
        }
      );
  }

  /**
   * Función que permite realizar operaciones CRUD para los menú BE
   * 1.- Registrar
   * 2.- Editar
   * @param form -- Recibe el formulario del FRONT
   */
  crudMenu(form: any): void {
    // Se valida el formulario
    if (this.formMenu.invalid) {
      this.validateAllFormFields(this.formMenu);
      return;
    }

    let menuPadre = 0;

    if (!form.menu.menu_id) {
      menuPadre = 0;
    } else {
      menuPadre = form.menu.menu_id;
    }

    let data = {
      menu_id: 0,
      titulo: form.titulo,
      descripcion: form.descripcion,
      icon: form.icono,
      pathurl: form.pathurl,
      menu_padre_id: menuPadre,
      estatus: form.estatus,
    };

    if (this.accion === 2) {
      this.blockUI.start('Editando ...');
      data = {
        menu_id: this.menu_id,
        titulo: form.titulo,
        descripcion: form.descripcion,
        icon: form.icono,
        pathurl: form.pathurl,
        menu_padre_id: menuPadre,
        estatus: form.estatus,
      };
    } else {
      this.blockUI.start('Guardando ...');
    }

    this.service
      .registrar(
        {
          datos: data,
          accion: this.accion,
        },
        'crudMenuClientes'
      )
      .subscribe(
        (result) => {
          this.blockUI.stop();
          this.service.showNotification('top', 'right', 2, result.mensaje);
          this.nuevoMenu();
        },
        (error) => {
          this.blockUI.stop();
          this.service.showNotification('top', 'right', 4, error.Message);
        }
      );
  }

  nuevoMenu() {
    this.accion = 1;
    this.menu_id = 0;
    this.mostrarEditar = false;
    this.mostrarGuardar = true;
    this.formMenu.reset();
    this.spsJsonMenu();
    this.spsListaMenus();
  }

  /**
   * Metodo para listar los menus activos
   */
  spsListaMenus() {
    this.blockUI.start('Cargando datos...');

    this.service
      .getListByObjet(
        {
          datos: {
            estatus: true,
          },
          accion: 1,
        },
        'listaMenusBe'
      )
      .subscribe(
        (data) => {
          this.blockUI.stop();

          this.listaMenus = data.info;

          this.opcionesMenu = this.formMenu.get('menu').valueChanges.pipe(
            startWith(''),
            map((value) => this._filterMenu(value))
          );
        },
        (error) => {
          this.blockUI.stop();
          this.service.showNotification('top', 'right', 4, error.Message);
        }
      );
  }

  /**
   * Filtra de menus
   * @param value --texto de entrada
   * @returns la opcion u opciones que coincidan con la busqueda
   */
  private _filterMenu(value: any): any {
    let filterValue = value;

    if (value === null || value === undefined) {
      value = '';
    }

    if (!value[0]) {
      filterValue = value;
    } else {
      filterValue = value.toLowerCase();
    }

    return this.listaMenus.filter((option) =>
      option.titulo.toLowerCase().includes(filterValue)
    );
  }

  /**
   * Muestra la descripcion del menu
   * @param option --estado seleccionada
   * @returns --nombre de menu
   */
  displayFn(option: any): any {
    return option ? option.titulo : undefined;
  }

  /**
   * Validacion para los campos
   */
  validaciones = {
    cvemenu: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'maxlength', message: 'Campo maximo 10 dígitos.' },
    ],
    titulo: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'maxlength', message: 'Campo maximo 30 dígitos.' },
    ],
    menu: [
      { type: 'invalidAutocompleteObject', message: 'El menú no existe.' },
    ],
    descripcion: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'maxlength', message: 'Campo maximo 255 dígitos.' },
    ],
    icono: [{ type: 'maxlength', message: 'Campo maximo 30 dígitos.' }],
    pathurl: [{ type: 'maxlength', message: 'Campo maximo 20 dígitos.' }],
    estatus: [{ type: 'required', message: 'Campo requerido.' }],
  };

  /**
   * Valida Cada atributo del formulario
   * @param formGroup - Recibe cualquier tipo de FormGroup
   */
  validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  /**
   * Valida que el texto ingresado pertenezca a un estado
   * @returns mensaje de error.
   */
  autocompleteObjectValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (typeof control.value === 'string' && control.value.length > 0) {
        return { invalidAutocompleteObject: { value: control.value } };
      }
      return null; /* valid option selected */
    };
  }

  editarMenu(elemento): void {
    this.mostrarEditar = true;
    this.mostrarGuardar = false;
    this.accion = 2;
    this.menu_id = elemento.menu_id;
    this.formMenu.get('titulo').setValue(elemento.titulo);
    this.formMenu.get('descripcion').setValue(elemento.descripcion);
    this.formMenu.get('icono').setValue(elemento?.icono);
    this.formMenu.get('pathurl').setValue(elemento?.pathurl);
    this.formMenu.get('estatus').setValue(elemento.estatus);

    if (elemento.menu_padre_id) {
      let menuPadre = this.listaMenus.find(
        (x) => x.menu_id == elemento.menu_padre_id
      );
      this.formMenu.get('menu').setValue(menuPadre);
    } else {
      this.formMenu.get('menu').setValue('');
    }
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

  filterTree(filterText: string) {
    // use filter input text, return filtered TREE_DATA, use the 'name' object value
    this.dataSourceMenus.data = this.filterRecursive(
      filterText,
      this.arbolMenus,
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
}
