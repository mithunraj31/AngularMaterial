import { async, TestBed } from '@angular/core/testing';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog.component';
describe('DeleteConfirmationDialogComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DeleteConfirmationDialogComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(DeleteConfirmationDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=delete-confirmation-dialog.component.spec.js.map