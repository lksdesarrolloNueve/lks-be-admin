import { Component, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { PermisosService } from "../../../../app/shared/service/permisos.service";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { GestionGenericaService } from "../../../shared/service/gestion";
import * as moment from "moment";


@Component({
    selector: 'amortizacion',
    moduleId: module.id,
    templateUrl: 'amortizacion.component.html'
})

/**
 * @autor: 
 * @version: 1.0.0
 * @fecha:
 * @descripcion: 
 */

export class AmortizacionComponent implements OnInit {

    //Declaracion de varablies y Controles
    displayedColumns: string[] = ['numamortizacion', 'fechapago', 'interes', 'importe', 'interesnormal', 'iva', 'saldo', 'pagototal', 'monto']
    listaAmortizacion = [];
    //Botones boolean
    seleccionado: boolean;
    allSelected: boolean;
    filteredSucursales: Observable<string[]>;
    formAmortizacion: UntypedFormGroup;
    listaAmortizacion2 = [];
    fechaGeneral: string;
    opcionesTipoCredito: Observable<string[]>;
    listaCreditos: any[] = [];
    listaFrecuenciaPago: any[] = [];
    listaPeriodo: any[] = [];


    habilitarPrPago: boolean = true;
    habilitarToogleFuturo: boolean = false;
    readOnly: boolean = false;


    
    
 

    autoTicks = false;
    disabled = false;
    invert = false;
    max = 0;
    min = 0;
    showTicks = true;
    step = .1;
    thumbLabel = true;
    value = 0;
    vertical = false;
    tickInterval = .1;

    //Imports
    dataSourceAmortizacion: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @BlockUI() blockUI: NgBlockUI;

    //Creación del arreglo para implementar las validaciones
    //en el modal de admin-asigna-documento.component.html
    validaciones = {
        'tipoCredito':[
            {type: 'required' ,message: 'Campo requerido'},
            { type: 'invalidAutocompleteObject', message: 'El crédito no pertenece a la lista, elija otro.' }
        ],
        'monto': [
            { type: 'required', message: 'Campo requerido.' },
            { type: 'pattern', message: 'Solo se aceptan números' },
        ],
        'primerpago': [
            { type: 'required', message: 'Campo requerido.' },
        ],
        'numamortizaciones': [
            { type: 'required', message: 'Campo requerido.' },
            { type: 'pattern', message: 'Solo se aceptan números' },
        ],
        'pfechaotorga': [
            { type: 'required', message: 'Campo requerido.' },

        ],
        'periodo':[
            {type: 'required', message: 'Campo requerido.'}
        ]
        


    }
    /**
     * Constructor de la clase PeriodoComponent
     * @param service --Service para el acceso a datos
     */
    constructor(private service: GestionGenericaService, public dialog: MatDialog, private fomrBuilder: UntypedFormBuilder,
        private servicePermisos: PermisosService,) {
        this.formAmortizacion = this.fomrBuilder.group({
            monto: new UntypedFormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
            primerpago: new UntypedFormControl( {value: '',disabled: true}),
            numamortizaciones: new UntypedFormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
            pfechaotorga: new UntypedFormControl('', [Validators.required]),
            tipoCredito:new UntypedFormControl('', { validators: [this.autocompleteObjectValidator(), Validators.required] }),
            paplicaiva:new UntypedFormControl({ value : '', disabled: true }),
            periodo: new UntypedFormControl('', [Validators.required]),
            tasaInteres: new UntypedFormControl(''),
            aplicaFuturo: new UntypedFormControl(false)

            
           
        });
    }


    /**
     * OnInit de la clase amortizaciones para inicar los métodos.
     */
    ngOnInit() {
        this.spsTipoCreditos();
    }


    /**
     * Metodo que lista la tabla de amortizacion
     */
    spsAmortizaciones() {
        if (this.formAmortizacion.invalid) {
            this.validateAllFormFields(this.formAmortizacion);
            return;
        }

        if(this.formAmortizacion.get('tasaInteres').value <=0){
            this.service.showNotification('top', 'right', 3, 'Elige una tasa de Interés');
            return;
        }

        let tipoAmortizacion ='02';

        if(this.formAmortizacion.get('tipoCredito').value.extenciones.extencionCatalogoCreditos.tipoAmortizacionId === 1){
            tipoAmortizacion ='01';
        }

           
            this.blockUI.start('Cargando datos...');
            let datos: any;
            
            datos = {
                
                    "pclavecredito": this.formAmortizacion.get('tipoCredito').value.cveCredito,
                    "pmonto": this.formAmortizacion.get('monto').value,
                    "ptasa": this.formAmortizacion.get('tasaInteres').value,
                    "pplazo": this.formAmortizacion.get('periodo').value.dias,
                    "amortizaciones": this.formAmortizacion.get('numamortizaciones').value,
                    "ptipoamortizacion": tipoAmortizacion,
                    "paplicaiva": this.formAmortizacion.get('paplicaiva').value,
                    "pfechaotorga": moment(this.formAmortizacion.get('pfechaotorga').value).format("yyyy-MM-DD"),
                    "aplicapfuturo":this.formAmortizacion.get('aplicaFuturo').value,
                    "pprimerpago": moment(this.formAmortizacion.get('primerpago').value).format("yyyy-MM-DD"),

                
            };
     
            this.service.getListByObjet(datos, 'listaAmortizaciones').subscribe(data1 => {
                this.blockUI.stop();
                this.listaAmortizacion = data1;
                this.formAmortizacion.get('primerpago').setValue(this.listaAmortizacion[0].fechapago + 'T00:00:00');
                this.dataSourceAmortizacion = new MatTableDataSource(this.listaAmortizacion);
                this.dataSourceAmortizacion.paginator = this.paginator;
                this.dataSourceAmortizacion.sort = this.sort;
            }, error => {
                this.blockUI.stop();
                this.service.showNotification('top', 'right', 4, error.message);
            });


    }
    /**
     * Método para limpiar datos
     */
    limpiarDatos() {
        this.formAmortizacion.reset();
        this.listaAmortizacion = [];
        this.dataSourceAmortizacion = new MatTableDataSource(this.listaAmortizacion2);
    }

    /**
 * Metodo que lista los tipos de Creditos
 */
    spsTipoCreditos() {
        let id = this.servicePermisos.sucursalSeleccionada.sucursalid;
        this.service.getListByArregloIDs(id + '/' + 2, 'listaCreditosBySucursal').subscribe(data => {
            this.blockUI.start('Cargando ...')
            this.listaCreditos = data
            // Se setean los creditos para el autocomplete
            this.opcionesTipoCredito = this.formAmortizacion.get('tipoCredito').valueChanges.pipe(
                startWith(''),
                map(value => this._filterTipoCredito(value)));

            this.blockUI.stop();
        }, error => {
            this.blockUI.stop();
            this.service.showNotification('top', 'right', 4, error.Message);
        });
    }

     /**
     * Metodo que carga la informacion de condiciones de pago, finaidades, tasas de interes
     * @param option objeto de tipo de creditos
     */
      cargarInformacion(option) {

        this.formAmortizacion.get('paplicaiva').setValue(option.aplicaIVA);
        this.spsPeriodo(option)

        let tasasIntervalo = JSON.parse(option.extenciones.extCatCreCinco.rangoInteresNormal);
        this.max = tasasIntervalo[0].tasa_final;
        this.min = tasasIntervalo[0].tasa_inicial;
        if(option.extenciones.extCatCreCuatro.pagoFuturo === true){
             //toogle en false y habilitado
             this.habilitarToogleFuturo = false;
             this.formAmortizacion.get('aplicaFuturo').setValue(false);
             //fecha primer pago se habilita 
             this.habilitarPrPago = false;
        }else{
             //fecha primer pago se deshabilita 
             this.habilitarPrPago = true;
             //deshabilitado
             this.habilitarToogleFuturo = true;
             this.formAmortizacion.get('aplicaFuturo').setValue(false);
        }

    }

    getSliderTickInterval(): number | 'auto' {
        if (this.showTicks) {
            return this.autoTicks ? 'auto' : this.tickInterval;
        }

        return 0;
    }

        /**
     * Metodo para cargar los plazos
     */
         spsPeriodo(option) {

            this.listaFrecuenciaPago=[];
            this.blockUI.start('Cargando datos...');
    
            this.service.getListByID(2, 'listaTipoPlazo').subscribe(data => {
                this.listaPeriodo = data
    
                // Recorremos la lista listaPeriodo y el objeto option parceandolo a json
                // seleccionamos los que se encuentren en option.
                for (let x of this.listaPeriodo) {
                    for (let i of JSON.parse(option.extenciones.extencionCatalogoCreditosTres.frecuenciaPagos)) {
                        if (x.tipoPlazoId === i.tipo_plazo_id) {
                            this.listaFrecuenciaPago.push(x);
                        }
                    }
                }
                this.blockUI.stop();
            }, error => {
                this.blockUI.stop();
                this.service.showNotification('top', 'right', 4, error.Message);
            }
            );
        }

    /**
    * Filtra el tipo de credito
    * @param value --texto de entrada
    * @returns la opcion u opciones que coincidan con la busqueda
    */
    private _filterTipoCredito(value: any): any[] {
        let filterValue = value;
        if (value === null || value === undefined) {
            value = '';
        }
        if (!value[0]) {
            filterValue = value;
        } else {
            filterValue = value.toLowerCase();
        }
        return this.listaCreditos.filter(option => option.cveCredito.toLowerCase().trim().includes(filterValue)
        || option.descripcion.toLowerCase().trim().includes(filterValue));
    }

      /**
     * Se obtiene el estatus del pago futuro al cambiar
     * @param event checked se conoce el estatus del toogle
     */
       filtroFuturo(event: any) {

        if (event.checked === false) {
            this.habilitarPrPago = true;
        } else {
            this.habilitarPrPago = false;
        }
    }


    imprimirTabla(): void {
        let printContents, popupWin;
        printContents = document.getElementById('print-section').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
          <html>
            <head>
              <title>Cotización Crédito</title>
              <style>
              //........Customized style.......
              </style>
            </head>
        <body onload="window.print();window.close()">${printContents}</body>
          </html>`
        );
        popupWin.document.close();
    }


    /**
     * Muestra la descripcion del tipo de Credito
     * @param option --tipo credito seleccionado
     * @returns -- tipo credito
     */
    displayFnTipoCredito(option: any): any {
        return option ? option.descripcion.trim() : undefined;
    }

    /**
       * Valida que el texto ingresado pertenezca a un estado
       * @returns mensaje de error.
       */
     autocompleteObjectValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (typeof control.value === 'string' && control.value.length > 0) {
                return { 'invalidAutocompleteObject': { value: control.value } }
            }
            return null  /* valid option selected */
        }
    }

       /**
* Valida Cada atributo del formulario
* @param formGroup - Recibe cualquier tipo de FormGroup
*/
validateAllFormFields(formGroup: UntypedFormGroup) {         
    Object.keys(formGroup.controls).forEach(field => {  
        const control = formGroup.get(field);             
        if (control instanceof UntypedFormControl) {             
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof UntypedFormGroup) {        
            this.validateAllFormFields(control);            
        }
    });
}

 

}