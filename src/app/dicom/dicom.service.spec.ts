import { TestBed, inject } from '@angular/core/testing';

import { DicomService } from './dicom.service';

describe('DicomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DicomService]
    });
  });

  it('should be created', inject([DicomService], (service: DicomService) => {
    expect(service).toBeTruthy();
  }));
});
