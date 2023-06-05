import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Params } from '@angular/router';
import { data, param } from 'jquery';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { GestionGenericaService } from '../../../shared/service/gestion';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { environment } from '../../../../environments/environment';
import { PermisosService } from '../../../shared/service/permisos.service';
import { Router } from '@angular/router';

//interface de roles en el sistema
interface rolOpciones {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'filtro-cliente-be',
  moduleId: module.id,
  templateUrl: 'filtro-cliente-be.component.html',
  styleUrls: ['filtro-cliente-be.component.css'],
})
export class FiltroBEComponent {
  //variables
  title = 'alta-cliente';
  selectedRole: String; //mostrar rol seleccionado en el front
  clienteID: Params; //id del cliente en banca electronica
  clienteIDkey: any; //id del usuario keycloack
  telefono: number;
  correo: any;
  origenid: any; //id de origen de inseccion del cliente be
  estatus: number = 438; // Estatus del cliente BE (por defecto es ACTIVO - 438)
  resultadoCrud: any; //mesaje de inserccion
  myForm: FormGroup; // datos del formulario
  rolID: any;
  valorRespuesta: any; //id del rol por numero
  vUsuarioId: any; // Variable que guarda el id del usuario actual
  origenID: any;

  @BlockUI() blockUI: NgBlockUI; //animacion de cargando al tarda peticion

  responseCliente: Object;
  iblResultado: any;
  valorRol: any;
  roles: rolOpciones[];
  listaRolesBe: any = [];
  listaPermisos: any = [];

  //contructos condatos el formulario y http
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private activedRoute: ActivatedRoute,
    private service: GestionGenericaService,
    private servicePermisos: PermisosService
  ) {
    this.origenID = environment.generales.origenMov; // Origen del movimiento
    const params = this.activedRoute.snapshot.params; //obtener nombre del cliente
    this.getClientes(params); //obtener objeto del cliente seleccionado el alta-clientes mediante el nombre
    this.spsRolesBe(); //obtener roles disponibles
    this.roles = this.valorRol;

    //obtener valores del formulario en el html
    this.myForm = this.formBuilder.group({
      nombreCliente: new FormControl(''), //valor del campo de id cliente en el html
      persona_juridica_id: new FormControl(''),
      sucursal_id: new FormControl(''), //valor del campo usuario id en el html
      telefono: new FormControl(''),
      correo: new FormControl(''),
      estatus: new FormControl(''),
      rol: new FormControl(''), //valor del check list en el html numerico
    });

    this.getUser();
  }

  /**
   * metodo para insertar un cliente en la tabla cliente_be resive como parametro un numero que
   * realiza la accion dentro de la funcion en la base de datos
   * @param  opcion - evento a filtrar
   */

  insertClienteBE(opcion: number) {
    //archivo a insertar en la base de datos
    const JSONGuardar = {
      //datos a insertar de los form controls
      datos: {
        cliente_id: this.valorRespuesta.info[0].cliente_id,
        usuario_alta_id: this.vUsuarioId,
        tipo_cliente: this.valorRespuesta.info[0].persona_juridica,
        origen_id: this.origenID,
        telefono: this.myForm.get('telefono').value,
        correo: this.myForm.get('correo').value,
        estatus_id: this.estatus,
        rol_id: this.myForm.get('rol').value, // Convertir el valor booleano a un entero
      },
      // Accion a realizar
      accion: opcion,
    };

    this.blockUI.start('Guardando ...');

    //metodo de inserccion mediante un post y mensaje de proceso realizado con exito o falla
    this.service.registrar(JSONGuardar, 'crudClientesBe').subscribe(
      (resultado) => {
        this.blockUI.stop();
        this.resultadoCrud = resultado;
        if (this.resultadoCrud.codigo === '0') {
          this.service.showNotification(
            'top',
            'right',
            2,
            this.resultadoCrud.mensaje
          );
          this.myForm.reset();
          this.listaPermisos = [];
        } else {
          this.service.showNotification(
            'top',
            'right',
            4,
            this.resultadoCrud.mensaje
          );
          this.router.navigate(['/be-clientes']);
        }
      },
      (error) => {
        this.blockUI.stop();
        this.service.showNotification('top', 'right', 4, error.Message);
      }
    );
  }

  //metodo para canselar accion y redireccionar a alta clientes
  canselar() {
    this.router.navigate(['/be-alta-cliente']);
  }

  /**
   * Obtiene los clientes ya registrados en en el sistema
   * @param params - evento a filtrar
   */
  getClientes(params: Params) {
    this.blockUI.start('Cargando datos...');

    //consulta a la funcion listarClientes donde toma el filtro por nombre de la variable params
    const jsonGuardar = {
      datos: {
        filtro: params.id,
        cvesocio: '',
      },
      accion: 1,
    };

    this.service.getListByObjet(jsonGuardar, 'listaClientes').subscribe(
      (response) => {
        this.blockUI.stop();
        this.valorRespuesta = response; //guarda el resultado el la variable valorRespuesta
        this.responseCliente = response; //guarda el resultado el la variable responseCliente
      },
      (error) => {
        this.blockUI.stop();
        this.service.showNotification('top', 'right', 4, error.Message);
      }
    );
  }

  /**
   * Metodo para listar los roles be
   * obtenerlos en el seleccionados
   */
  spsRolesBe() {
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
        },
        (error) => {
          this.blockUI.stop();
          this.service.showNotification('top', 'right', 4, error.Message);
        }
      );
  }

  /**
   * Metodo para listar permisos del rol seleccionado en el formulario
   * @param rol - evento a filtrar
   */
  listaPermisosRol(rol: any) {
    this.blockUI.start();
    this.service
      .getListByObjet(
        {
          datos: { rolId: rol.generales_id },
          accion: 1,
        },
        'spsPermisosRolBe'
      )
      .subscribe(
        (data) => {
          this.listaPermisos = data.info;
          this.blockUI.stop();
        },
        (error) => {
          this.blockUI.stop();
          this.service.showNotification('top', 'right', 4, error.Message);
        }
      );
  }

  //metodo al cargar pagina que nos devuelve el id usuario que esta iniciando secion en ese momento
  getUser() {
    //Usuario id y sucursal id.
    this.vUsuarioId = this.servicePermisos.usuario.id;
  }
}