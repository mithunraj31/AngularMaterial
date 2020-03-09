import { async, TestBed } from '@angular/core/testing';
import { EditProductSetDialogComponent } from './edit-product-set-dialog.component';
describe('EditProductSetDialogComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditProductSetDialogComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(EditProductSetDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=edit-product-set-dialog.component.spec.js.map