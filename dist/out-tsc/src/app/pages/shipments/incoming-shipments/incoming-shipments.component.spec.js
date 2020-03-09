import { async, TestBed } from '@angular/core/testing';
import { IncomingShipmentsComponent } from './incoming-shipments.component';
describe('IncomingShipmentsComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IncomingShipmentsComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(IncomingShipmentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=incoming-shipments.component.spec.js.map