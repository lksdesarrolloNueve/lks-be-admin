import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Componentes para CATALOGOS
import { SucursalesComponent } from '../../pages/configuracion/sucursales/sucursales.component';
import { AdministracionSucursalesComponent } from '../../pages/configuracion/sucursales/modal-sucursales/administracion-sucursales.component';
import { TipoSociosComponent } from '../../pages/configuracion/tipos-socios/tipos-socios.component';
import { AdministracionTipoSociosComponent } from '../../pages/configuracion/tipos-socios/modal-tipo-socios/administracion-tipos-socios.component';
import { NacionalidadesComponent } from '../../pages/configuracion/nacionalidades/nacionanalidades.component';
import { AdministracionNacionalidadesComponent } from '../../pages/configuracion/nacionalidades/modal-nacionalidades/administracion-nacionalidades.component';
import { CalidadExtranjeroComponent } from '../../pages/configuracion/calidad-extranjeros/calidad-extranjeros.component';
import { AdminCalidadExtranjeroComponent } from '../../pages/configuracion/calidad-extranjeros/modal-calidadextranjero/administracion-calidadextranjero.component';
import { ActividadesPLDComponent } from '../../pages/configuracion/actividades-pld/actividades-pld.component';
import { AdministracionActividadesPLD } from '../../pages/configuracion/actividades-pld/modal-actividades-pld/administracion-act-pld.component';
import { BancosSatComponent } from '../../pages/configuracion/bancos-sat/bancos-sat.component';
import { AdministracionBancoSatComponent } from '../../pages/configuracion/bancos-sat/modal-bancos-sat/administracion-bancos-sat.component';
import { ClasificacionCredComponent } from '../../pages/configuracion/clasificacion-cred/clasificacion-cred.component';
import { AdministracionClasificacionCred } from '../../pages/configuracion/clasificacion-cred/modal-clasificacion-cred/administracion-clas-cred.component';
import { FinalidadCreditoComponent } from '../../pages/configuracion/finalidades-creditos/finalidades-creditos.component';
import { AdminFinalidadCreditoComponent } from '../../pages/configuracion/finalidades-creditos/modal-finalidadcredito/administracion-finalidadcredito.component';
import { MonedasSATComponent } from '../../pages/configuracion/monedas-sat/monedas-sat.component';
import { AdministracionMonedasComponent } from '../../pages/configuracion/monedas-sat/modal-monedas-sat/administracion-monedas-sat.component';
import { GarantiasComponent } from '../../pages/configuracion/garantias/garantias.component';
import { AdministracionGarantiasComponent } from '../../pages/configuracion/garantias/modal-garantias/administracion-garantias.component';
import { EstadoCredComponent } from '../../pages/configuracion/estado-cred/estado-cred.component';
import { AdministracionEstadoCred } from '../../pages/configuracion/estado-cred/modal-estado-cred/administracion-estado-cred.component';
import { CategoriaComponent } from '../../pages/configuracion/categorias-generales/categorias/categorias.component';
import { AdministracionCategoriasComponent } from '../../pages/configuracion/categorias-generales/categorias/modal-categorias/administracion-categorias.component';
import { GeneralesComponent } from '../../pages/configuracion/categorias-generales/generales/generales.component';
import { AdministracionGeneralesComponent } from '../../pages/configuracion/categorias-generales/generales/modal-generales/administracion-generales.component';
import { LocalidadesComponent } from '../../pages/configuracion/localidades/localidades.component';
import { UdisComponent } from '../../pages/configuracion/udis/udis.component';
import { AdministracionUdiComponent } from '../../pages/configuracion/udis/modal-udis/administracion-udis.component';
import { TipoAmortizacionComponent } from '../../pages/configuracion/tipos-amortizaciones/tipos-amortizaciones.component';
import { AdminTipoAmortizacionComponent } from '../../pages/configuracion/tipos-amortizaciones/modal-tipoamortizacion/administracion-tipoamortizacion.component';
import { ServidoresComponent } from '../../pages/configuracion/servidores/servidores.component';
import { AdministracionServidoresComponent } from '../../pages/configuracion/servidores/modal-servidores/admin-servidores.component';
import { CiudadesComponent } from '../../pages/configuracion/ciudades/ciudades.component';
import { AdministracionCiudadesComponent } from '../../pages/configuracion/ciudades/modal-ciudades/administracion-ciudades.component';
import { AdminLocalidadComponent } from '../../pages/configuracion/localidades/admin-localidad/admin-localidad.component';
import { EstadosComponent } from '../../pages/configuracion/estados/estados.component';
import { AdministracionEstadosComponent } from '../../pages/configuracion/estados/modal-estados/administracion-estados.component';
import { DiaInhabilComponent } from '../../pages/configuracion/dia-inhabil/dia-inhabil.component';
import { AdminDiaInhabilComponent } from '../../pages/configuracion/dia-inhabil/modal-diainhabil/administracion-diainhabil.component';
import { verificacionModalComponent } from '../../pages/modales/verificacion-modal/verificacion-modal.component';
import { ActividadesVulnerablesComponent } from '../../pages/configuracion/actividades-vulnerables/actividades-vul.component';
import { AdministracionActividadesVul } from '../../pages/configuracion/actividades-vulnerables/modal-actividades-vulnerables/administracion-act-vul.componet';
import { CuentasContablesComponent } from '../../pages/configuracion/cuentas-contables/cuentas-contables.component';
import { ColoniaComponent } from '../../pages/configuracion/colonias/colonias.component';
import { AdminColoniaComponent } from '../../pages/configuracion/colonias/modal-colonias/administracion-colonias.component';
import { ActividadesSCIANComponent } from '../../pages/configuracion/actividades-scian/actividades-scian.component';
import { SectoresComponent } from '../../pages/configuracion/actividades-scian/sectores/sectores.component';
import { SubSectoresComponent } from '../../pages/configuracion/actividades-scian/sub-sectores/sub-sectores.component';
import { RamasComponent } from '../../pages/configuracion/actividades-scian/ramas/ramas.component';
import { SubRamasComponent } from '../../pages/configuracion/actividades-scian/sub-ramas/sub-ramas.component';
import { ClaseActividadesComponent } from '../../pages/configuracion/actividades-scian/clase-actividades/clase-actividades.component';
import { AdministracionSectoresComponent } from '../../pages/configuracion/actividades-scian/sectores/modal-sectores/administracion-sectores.component';
import { DivisionComponent } from '../../pages/configuracion/actividades-sinco/division/division.component';
import { AdministracionDivisionComponent } from '../../pages/configuracion/actividades-sinco/division/modal-division/administracion-division.component';
import { ActividadesSincoComponent } from '../../pages/configuracion/actividades-sinco/actividades-sinco.component';
import { PrincipalComponent } from '../../pages/configuracion/actividades-sinco/principal/principal.component';
import { AdministracionPrincipalComponent } from '../../pages/configuracion/actividades-sinco/principal/modal-principal/administracion-principal.component';
import { AdministracionSubgrupoComponent } from '../../pages/configuracion/actividades-sinco/subgrupo/modal-subgrupo/administracion-subgrupo.component';
import { SubgrupoComponent } from '../../pages/configuracion/actividades-sinco/subgrupo/subgrupo.component';
import { UnitarioComponent } from '../../pages/configuracion/actividades-sinco/unitario/unitario.component';
import { AdministracionUnitarioComponent } from '../../pages/configuracion/actividades-sinco/unitario/modal-unitario/administracion-unitario.component';
import { OcupacionComponent } from '../../pages/configuracion/actividades-sinco/ocupacion/ocupacion.component';
import { AdministracionOcupacionComponent } from '../../pages/configuracion/actividades-sinco/ocupacion/modal-ocupacion/administracion-ocupacion.component';
import { CategoriaGeneralesComponent } from '../../pages/configuracion/categorias-generales/categoria-general.component';
import { FormasPagoComponent } from '../../pages/configuracion/formas-pago/formas-pago.component';
import { AdministracionFormasPago } from '../../pages/configuracion/formas-pago/modal-formas-pago/administracion-formas-pago.component'
import { BancosSitiComponent } from '../../pages/configuracion/bancos-siti/bancos-siti.component';
import { AdministracionBancoSitiComponent } from '../../pages/configuracion/bancos-siti/modal-bancos-siti/administracion-bancos-siti.component';
import { CuentaBancariaComponent } from '../../pages/configuracion/cuentas-bancarias/cuentas-bancarias.component';
import { AdminCuentaBComponent } from '../../pages/configuracion/cuentas-bancarias/modal-cuentas-bancarias/administracion-cuentas-bancarias.component';
import { AdministracionSubSectoresComponent } from '../../pages/configuracion/actividades-scian/sub-sectores/modal-sub-sectores/administracion-sub-sectores.component';
import { AdministracionRamasComponent } from '../../pages/configuracion/actividades-scian/ramas/modal-ramas/administracion-ramas.component';
import { AdministracionSubRamasComponent } from '../../pages/configuracion/actividades-scian/sub-ramas/modal-sub-ramas/administracion-sub-ramas.component';
import { AdministracionClaseActividadesComponent } from '../../pages/configuracion/actividades-scian/clase-actividades/modal-clase-actividades/administracion-clase-actividades.component';
import { InversionesComponent } from '../../pages/configuracion/inversiones/inversiones.component';
import { AdministracionInversionesComponent } from '../../pages/configuracion/inversiones/modal-inversiones/admin-inversiones.component';
import { AvisosComponent } from '../../pages/configuracion/avisos/avisos.component';
import { AdministracionAvisosComponent } from '../../pages/configuracion/avisos/modal-avisos/admin-avisos.component';
import { InpcComponent } from '../../pages/configuracion/inpc/inpc.component';
import { AdministracionInpcComponent } from '../../pages/configuracion/inpc/modal-inpc/administracion-inpc.component';
import { BovedaComponent } from '../../pages/configuracion/bovedas/bovedas.component';
import { AdminBovedaComponent } from '../../pages/configuracion/bovedas/modal-bovedas/admin-bovedas.component';
import { CajasComponent } from '../../pages/configuracion/cajas/cajas.component';
import { AdministracionCajasComponent } from '../../pages/configuracion/cajas/modal-cajas/administracion-cajas.component';
import { IsrComponent } from '../../pages/configuracion/isr/isr.component';
import { AdministracionIsrComponent } from '../../pages/configuracion/isr/modal-isr/administracion-isr.component';
import { TipoPlazoComponent } from '../../pages/configuracion/tipo-plazo/tipo-plazo.component';
import { AdministracionTipoPlazoComponent } from '../../pages/configuracion/tipo-plazo/modat-tipo-plazo/administracion-tipo-plazo.component';
import { CalificacionCarteraComponent } from '../../pages/configuracion/calificacion-cartera/calificacion-cartera.component';
import { CuentasContablesAnexo24Component } from '../../pages/configuracion/cuentas-cont-anexo24/cuentas-cont-anexo24.component';
import { IndicehhComponent } from '../../pages/configuracion/indicehh/indice-hh.component';
import { AdministracionIndicehhComponent } from '../../pages/configuracion/indicehh/modal-indicehh/administracion-indicehh.component';
import { CreditoRelacionadoComponent } from '../../pages/configuracion/credito-relacionado/credito-relacionado.component';
import { AdministracionCredRelComponent } from '../../pages/configuracion/credito-relacionado/modal-credito-relacionado/administracion-credrel.component';
import { AdminUsuariosComponent } from '../../pages/configuracion/rol-menu/admin-usuarios/admin-usuarios.component';
import { AdministracionRolesComponent } from '../../pages/configuracion/rol-menu/admin-usuarios/modal-roles/admin-roles.component';
import { EntidadesComponent } from '../../pages/configuracion/entidades/entidades.component';
import { SucursalesSocioComponent } from "../../pages/modales/sucursales-socio/sucursales-socio.component";
import { TipoFondosComponent } from '../../pages/configuracion/tipo-fondo/tipo-fondo.component';
import { AdministracionFondos } from '../../pages/configuracion/tipo-fondo/modal-tipo-fondos/administracion-fondos.component';
import { AmortizacionComponent } from '../../pages/configuracion/amortizacion/amortizacion.component';
import { CorreoComponent } from '../../pages/configuracion/correos/correo.component';
import { AdminCorreoComponent } from '../../pages/configuracion/correos/modal-correo/admin-correo.component';
import { SMSComponent } from '../../pages/configuracion/sms/sms.component';
import { AdminSMSComponent } from '../../pages/configuracion/sms/modal-sms/admin-sms.component';
import { UmaComponent } from '../../pages/configuracion/valor-uma/valor-uma.component';
import { AdministracionUmaComponent } from '../../pages/configuracion/valor-uma/modal-uma/administracion-uma.component';
import { MCargaDias } from '../../pages/configuracion/dia-inhabil/m-cm-dias/m-cm-dias.component';
import { MCargaCuentas } from '../../pages/configuracion/cuentas-contables/m-cm-cuentas/m-cm-cuentas.component';
import { LogoComponent } from '../../pages/configuracion/logo/logo.component';
import { CMAnexoComponent } from '../../pages/configuracion/cuentas-cont-anexo24/cm-anexo/cm-anexo.component';
import { DirecFuncFamiliaresComponent } from '../../pages/configuracion/direc-funcionarios-familiares/direc-funcionarios-familiares.component';
import { FondeoBancarioComponent } from '../../pages/configuracion/fondeo-bancario/fondeo-bancario.component';
import { VolatilidadComponent } from '../../pages/configuracion/volatilidad/volatilidad.component';
import { FraccionParamComponent } from '../../pages/configuracion/fraccion-param/fraccion-param.component';
import { ModalFraccionParametros } from '../../pages/configuracion/fraccion-param/modal-fraccion-param/modal-fraccion-param.component';

import { ProdcutosServiciosComponent } from '../../pages/configuracion/prodcutos-servicios/productos-servicios.component';
import { AdminProductoServicioComponent } from '../../pages/configuracion/prodcutos-servicios/admin-producto-servicio/admin-producto-servicio.component';
import { RecargaTelefonicaComponent } from '../../pages/configuracion/recargas-telefonicas/recarga-telefonica.component';
import { AdminRecargaTelefonicaComponent } from '../../pages/configuracion/recargas-telefonicas/admin-recarga-telefonica/admin-recarga-telefonica.component';

import { GastosComponent } from '../../pages/configuracion/gastos/gastos.component';
import { AdministracionGastosComponent } from '../../pages/configuracion/gastos/modal-gastos/administracion-gastos.component';
import { TipoActivosComponent } from '../../pages/configuracion/tipo-activos/activos/tipo-activos.component';
import { AdministrarTipoActivosComponent } from '../../pages/configuracion/tipo-activos/activos/modal-activos/administracion-tipo-activos.component';
import { TipoBajasComponent } from '../../pages/configuracion/tipo-activos/bajas/tipo-bajas.component';
import { ModalTipoBajasComponent } from '../../pages/configuracion/tipo-activos/bajas/modal-bajas/modal-tipo-bajas.component';
import { ParametrosComponent } from '../../pages/configuracion/tipo-activos/parametros/parametros.component';
import { ModalParametrosComponent } from '../../pages/configuracion/tipo-activos/parametros/modal-parametros/modal-parametros.component';
import { CuentasBajasComponent } from '../../pages/configuracion/tipo-activos/cuenta-bajas/cuenta-bajas.component';
import { ModalCuentaActivoBajaComponent } from '../../pages/configuracion/tipo-activos/cuenta-bajas/modal-cuenta/modal-cuenta-baja.component';



//Componentes para DIGITALIZACION

import { MenusComponent } from '../../pages/configuracion/rol-menu/menus/menus.component';
import { AltaPermisosComponent } from '../../pages/configuracion/rol-menu/alta-permisos/alta-permisos.component';
import { RangoInversionesComponent } from '../../pages/configuracion/rango-inversiones/rango-inversiones.component';
import { AdministracionRangoInversionesComponent } from '../../pages/configuracion/rango-inversiones/modal-rango-inversiones/admin-rango-inversiones.component';
import { MovimientosCajaComponent } from '../../pages/configuracion/movimientos-caja/movimientos-caja.component';
//import { AdminMapaComponent } from '../../pages/clientes/empresa/modal-mapa/admin-mapa.component';


//Componentes para CLIENTES

import { AdministracionProveedorComponent } from '../../pages/configuracion/proveedores/modal-proveedores/administracion-proveedor.component';
import { ProveedorComponent } from '../../pages/configuracion/proveedores/proveedores.component';
import { DepreciacionesComponent } from '../../pages/configuracion/depreciaciones/depreciaciones.component';
import { AdministracionDepreciacionesComponent } from '../../pages/configuracion/depreciaciones/modal-depreciaciones/admin-depreciaciones.component';
import { CreditosComponent } from '../../pages/configuracion/creditos/creditos.component';
import { CargosComponent } from '../../pages/configuracion/cargos/cargos.component';
import { AdministracionCargosComponent } from '../../pages/configuracion/cargos/modal-cargos/administracion-cargos.component';


//Componentes para CLIENTES


import { BuscarClientesComponent } from '../../pages/modales/clientes-modal/buscar-clientes.component';
import { DocumentosModalComponent } from '../../pages/modales/documentos-modal/documentos-modal.component';
import { DirecFuncionariosComponent } from '../../pages/configuracion/direc-funcionarios/direc-funcionarios.component';
import { AdminBajaComponent } from '../../pages/configuracion/direc-funcionarios/modal-baja/admin-baja.component';
import { SolicitudModalComponent } from '../../pages/modales/solicitud-modal/solicitud-modal.component';





//Componentes para CONTABILIDAD.



//componentes de conciliacion bancaria
import { ComiteComponent } from '../../pages/configuracion/comite-credito/comite.component';

//Componentes para CAJAS

import { listaModalComponent } from '../../pages/modales/lista-modal/lista-modal.component';

//Componentes para pld
import { PepComponent } from '../../pages/configuracion/peps/peps.component';
import { AdminPepsComponent } from '../../pages/configuracion/peps/modal-peps/admin-peps.component';
import { PbaComponent } from '../../pages/configuracion/pba/pba.component';
import { ModalPbaComponent } from '../../pages/configuracion/pba/modal-pba/modal-pba.component';
import { MaterialModule } from '../../material.module';



//import { GoogleMapsModule } from '@angular/google-maps';
import { JsonParsePipe } from '../../shared/pipes/jsonParse.pipe';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    //GoogleMapsModule,
    NgxMaskModule.forRoot(),
    MaterialModule
  ],
  declarations: [
    CajasComponent,
    SucursalesComponent,
    AdministracionSucursalesComponent,
    TipoSociosComponent,
    AdministracionTipoSociosComponent,
    NacionalidadesComponent,
    AdministracionNacionalidadesComponent,
    CalidadExtranjeroComponent,
    AdminCalidadExtranjeroComponent,
    ActividadesPLDComponent,
    AdministracionActividadesPLD,
    BancosSatComponent,
    AdministracionBancoSatComponent,
    ClasificacionCredComponent,
    AdministracionClasificacionCred,
    FinalidadCreditoComponent,
    AdminFinalidadCreditoComponent,
    MonedasSATComponent,
    AdministracionMonedasComponent,
    GarantiasComponent,
    AdministracionGarantiasComponent,
    EstadoCredComponent,
    AdministracionEstadoCred,
    CategoriaComponent,
    AdministracionCategoriasComponent,
    GeneralesComponent,
    AdministracionGeneralesComponent,
    CategoriaGeneralesComponent,
    UdisComponent,
    AdministracionUdiComponent,
    TipoAmortizacionComponent,
    AdminTipoAmortizacionComponent,
    ServidoresComponent,
    AdministracionServidoresComponent,
    CiudadesComponent,
    AdministracionCiudadesComponent,
    EstadosComponent,
    AdministracionEstadosComponent,
    DiaInhabilComponent,
    AdminDiaInhabilComponent,
    verificacionModalComponent,
    ActividadesVulnerablesComponent,
    AdministracionActividadesVul,
    LocalidadesComponent,
    AdminLocalidadComponent,
    CuentasContablesComponent,
    ColoniaComponent,
    AdminColoniaComponent,
    ActividadesSCIANComponent,
    SectoresComponent,
    SubSectoresComponent,
    RamasComponent,
    SubRamasComponent,
    ClaseActividadesComponent,
    AdministracionSectoresComponent,
    DivisionComponent,
    AdministracionDivisionComponent,
    ActividadesSincoComponent,
    PrincipalComponent,
    AdministracionPrincipalComponent,
    SubgrupoComponent,
    AdministracionSubgrupoComponent,
    UnitarioComponent,
    AdministracionUnitarioComponent,
    OcupacionComponent,
    AdministracionOcupacionComponent,
    FormasPagoComponent,
    AdministracionFormasPago,
    BancosSitiComponent,
    AdministracionBancoSitiComponent,
    CuentaBancariaComponent,
    AdminCuentaBComponent,
    AdministracionSubSectoresComponent,
    AdministracionRamasComponent,
    AdministracionSubRamasComponent,
    AdministracionClaseActividadesComponent,
    InversionesComponent,
    AdministracionInversionesComponent,
    AvisosComponent,
    AdministracionAvisosComponent,
    InpcComponent,
    AdministracionInpcComponent,
    BovedaComponent,
    AdminBovedaComponent,
    IsrComponent,
    AdministracionIsrComponent,
    CajasComponent,
    AdministracionCajasComponent,
    TipoPlazoComponent,
    AdministracionTipoPlazoComponent,
    MovimientosCajaComponent,
    AdministracionProveedorComponent,
    ProveedorComponent,
    MenusComponent,
    AltaPermisosComponent,
    RangoInversionesComponent,
    AdministracionRangoInversionesComponent,
    MovimientosCajaComponent,
    DepreciacionesComponent,
    AdministracionDepreciacionesComponent,
    CreditosComponent,
    CargosComponent,
    CalificacionCarteraComponent,
    CuentasContablesAnexo24Component,
    IndicehhComponent,
    AdministracionIndicehhComponent,
    AdministracionCargosComponent,
    CreditoRelacionadoComponent,
    AdministracionCredRelComponent,
    AdministracionCredRelComponent,
    BuscarClientesComponent,
    DocumentosModalComponent,
    DirecFuncionariosComponent,
    AdminBajaComponent,
    AdministracionCredRelComponent,
    AdminUsuariosComponent,
    AdministracionRolesComponent,
    EntidadesComponent,
    SucursalesSocioComponent,
    TipoFondosComponent,
    AdministracionFondos,
    ComiteComponent,
    AmortizacionComponent,
    CorreoComponent,
    AdminCorreoComponent,
    SMSComponent,
    AdminSMSComponent,
    UmaComponent,
    AdministracionUmaComponent,
    MCargaDias,
    MCargaCuentas,
    LogoComponent,
    JsonParsePipe,
    listaModalComponent,
    PepComponent,
    AdminPepsComponent,
    CMAnexoComponent,
    PbaComponent,
    ModalPbaComponent,
    SolicitudModalComponent,
    DirecFuncFamiliaresComponent,
    FondeoBancarioComponent,
    VolatilidadComponent,
    FraccionParamComponent,
    ModalFraccionParametros,
    ProdcutosServiciosComponent,
    AdminProductoServicioComponent,
    RecargaTelefonicaComponent,
    AdminRecargaTelefonicaComponent,
    GastosComponent,
    AdministracionGastosComponent,
    AdministrarTipoActivosComponent,
    TipoActivosComponent,
    TipoBajasComponent,
    ModalTipoBajasComponent,
    ParametrosComponent,
    ModalParametrosComponent,
    CuentasBajasComponent,
    ModalCuentaActivoBajaComponent,

  ]
})

export class AdminLayoutModule { }