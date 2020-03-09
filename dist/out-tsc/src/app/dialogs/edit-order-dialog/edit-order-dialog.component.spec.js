import { async, TestBed } from '@angular/core/testing';
import { EditOrderDialogComponent } from './edit-order-dialog.component';
describe('EditOrderDialogComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditOrderDialogComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(EditOrderDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=edit-order-dialog.component.spec.js.map