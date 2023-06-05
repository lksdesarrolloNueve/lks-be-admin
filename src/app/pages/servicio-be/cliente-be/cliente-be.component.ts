import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GestionGenericaService } from '../../../shared/service/gestion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

/**
 * @autor: Julio Samuel Torres Reyes
 * @version: 1.0.0
 * @fecha: 05/06/2023
 * @descripcion: Vista de Buscador de clientes en Banca electronica
 */

@Component({
  selector: 'cliente-be',
  moduleId: module.id,
  templateUrl: 'cliente-be.component.html',
  styleUrls: ['cliente-be.component.css'],
})
export class ClienteBEComponent {
  //Declaracion de variables y compoenentes
  displayedColumns: string[] = [
    'numeroCliente',
    'nombreCliente',
    'personaJuridica',
    'nombreSucursal',
    'fechaAlta',
    'ROL',
    'estatus',
    'acciones',
  ];
  dataSourceClientesBE: MatTableDataSource<any>;
  listSucursales: any;
  usuario: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private service: GestionGenericaService,
    public dialog: MatDialog
  ) {
    this.spsClientesBe();
  }

  /**
   * Metodo para mostrar los clientes de la be
   */
  spsClientesBe() {
    this.blockUI.start('Cargando datos...');

    this.service
      .getListByObjet(
        {
          datos: {
            filtro: '',
            cvesocio: '',
          },
          accion: 1,
        },
        'spsClientesBe'
      )
      .subscribe(
        (data) => {
          this.blockUI.stop();
          this.listSucursales = data.info;
          this.dataSourceClientesBE = new MatTableDataSource(
            this.listSucursales
          );
          this.dataSourceClientesBE.paginator = this.paginator;
          this.dataSourceClientesBE.sort = this.sort;
        },
        (error) => {
          this.blockUI.stop();
          this.service.showNotification('top', 'rigth', 4, error.Message);
        }
      );
  }

  /**
   * Metodo para filtrar clientes banca Electronica
   * @param event - evento a filtrar
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceClientesBE.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceClientesBE.paginator) {
      this.dataSourceClientesBE.paginator.firstPage();
    }
  }
}
