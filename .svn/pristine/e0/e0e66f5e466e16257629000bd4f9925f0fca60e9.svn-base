import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { CcdComponent } from './ccd/ccd.component';
import { SharingRecordsComponent } from './sharing-records/sharing-records.component';
import { ExportsComponent } from './exports/exports.component';
import { CcrComponent } from './ccr/ccr.component';
import { ImportComponent } from './import/import.component';

let emrRoutes: Routes = [
    { path: 'allergy', component: AllergyComponent },
    { path: 'appointment', component: AppointmentComponent },
    { path: "care-plan", component: CarePlanComponent },
    { path: "condition", component: ConditionComponent },
    { path: 'device', component: DeviceComponent },
    { path: 'diagnostic-report', component: DiagnosticReportComponent },
    { path: 'encounter', component: EncouterComponent },
    { path: 'immunization', component: ImmunizationComponent },
    { path: 'medication-statement', component: MedicationStatementComponent },
    { path: 'observation', component: ObservationComponent },
    { path: '', component: PatientComponent },
    { path: 'procedure', component: ProcedureComponent },
    { path: 'ccd', component:CcdComponent },
    { path: 'records', component: SharingRecordsComponent },
    { path: 'export', component: ExportsComponent },
    { path: 'ccr', component:CcrComponent },
    {path: 'import', component:ImportComponent}
]

@NgModule({
    imports: [RouterModule.forChild(emrRoutes)],
    exports: [RouterModule]
})

export class EmrRoutingModule {

}