import { Directive,
        ElementRef,
        HostListener, HostBinding,
        Renderer2} from '@angular/core';
@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') open = false;

    @HostListener('click') toggleOpen(){
        this.open = !this.open;
    }
    // open = false;
    // // @HostBinding('classList') class: string[];
    //
    // constructor(private elRef: ElementRef, private renderer: Renderer2){
    //
    // }
    //
    // @HostListener('click') click(eventData: Event){
    //     if(this.open){
    //         this.renderer.removeClass(this.elRef.nativeElement, 'open');
    //     }else{
    //         this.renderer.addClass(this.elRef.nativeElement, 'open');
    //     }
    //     this.open = !this.open;
    // }
}
