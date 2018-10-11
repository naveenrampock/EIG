import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmrComponent } from './emr.component';
import { EmrRoutingModule } from './emr.routing.module';
import { EmrNavigationComponent } from './emr-navigation/emr-navigation.component';
import { PatientComponent } from './patient/patient.component';
import { AllergyComponent } from './allergy/allergy.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { CarePlanComponent } from './care-plan/care-plan.component';
import { ConditionComponent } from './condition/condition.component';
import { DeviceComponent } from './device/device.component';
import { DiagnosticReportComponent } from './diagnostic-report/diagnostic-report.component';
import { EncouterComponent } from './encouter/encouter.component';
import { ImmunizationComponent } from './immunization/immunization.component';
import { MedicationStatementComponent } from './medication-statement/medication-statement.component';
import { ObservationComponent } from './observation/observation.component';
import { ProcedureComponent } from './procedure/procedure.component';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { AppointmentDetailsComponent } from './appointment/appointment-details/appointment-details.component';
import { AllergyDetailsComponent } from './allergy/allergy-details/allergy-details.component';
import { DeviceDetailsComponent } from './device/device-details/device-details.component';
import { ImmunizationDetailsComponent } from './immunization/immunization-details/immunization-details.component';
import { ObservationDetailsComponent } from './observation/observation-details/observation-details.component';
import { ConditionDetailsComponent } from './condition/condition-details/condition-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmrService } from './emr.service';
import { GrowlModule } from 'primeng/growl';
import { SharedModule } from '../shared/shared.module';
import { CarePlanDetailsComponent } from './care-plan/care-plan-details/care-plan-details.component';
import { EncounterDetailsComponent } from './encouter/encounter-details/encounter-details.component';
import { DiagnosticdetailComponent } from './diagnostic-report/diagnosticdetail/diagnosticdetail.component';
import { ProcedureDetailsComponent } from './procedure/procedure-details/procedure-details.component';
import { CcdComponent } from './ccd/ccd.component';
import { CcdDetailsComponent } from './ccd/ccd-details/ccd-details.component';
import { FileUploadModule } from 'primeng/components/fileupload/fileupload';
import { AutoCompleteModule } from 'primeng/primeng';
import { MedicationStatementDetailsComponent } from './medication-statement/medication-statement-details/medication-statement-details.component';
import { SharingRecordsComponent } from './sharing-records/sharing-records.component';
import { ExportsComponent } from './exports/exports.component';
import { AddccdDetailsComponent } from './ccd/addccd-details/addccd-details.component';
import { ViewDetailsComponent } from './ccd/view-details/view-details.component';
import { CcrComponent } from './ccr/ccr.component';
import { CcrviewDetailsComponent } from './ccr/ccrview-details/ccrview-details.component';
import { CcrDetailsComponent } from './ccr/ccr-details/ccr-details.component';
import { AddccrDetailsComponent } from './ccr/addccr-details/addccr-details.component';
import { ImportComponent } from './import/import.component';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { ImportDetailsComponent } from './import/import-details/import-details.component';


let declartions = [
  EmrComponent,
  EmrNavigationComponent,
  PatientComponent,
  AllergyComponent,
  AppointmentComponent,
  CarePlanComponent,
  ConditionComponent,
  DeviceComponent,
  DiagnosticReportComponent,
  EncouterComponent,
  ImmunizationComponent,
  MedicationStatementComponent,
  ObservationComponent,
  ProcedureComponent,
  AppointmentDetailsComponent,
  AllergyDetailsComponent,
  DeviceDetailsComponent,
  ImmunizationDetailsComponent,
  ObservationDetailsComponent,
  ConditionDetailsComponent,
  CarePlanDetailsComponent,
  EncounterDetailsComponent,
  DiagnosticdetailComponent,
CcdComponent, 
CcdDetailsComponent,
ProcedureDetailsComponent
]

let modules = [
  CommonModule,
  EmrRoutingModule,
  TableModule,
  CalendarModule,
  FormsModule,
  ReactiveFormsModule,
  GrowlModule,
  SharedModule,
  AutoCompleteModule,
  FileUploadModule,
  DialogModule
]

@NgModule({
  imports: [...modules],
  declarations: [...declartions, MedicationStatementDetailsComponent, SharingRecordsComponent, ExportsComponent, AddccdDetailsComponent, ViewDetailsComponent, CcrComponent, CcrviewDetailsComponent, CcrDetailsComponent, AddccrDetailsComponent, ImportComponent, ImportDetailsComponent],
  providers: [EmrService]
})
export class EmrModule { }
