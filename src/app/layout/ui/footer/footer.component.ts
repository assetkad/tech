import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import gsap from 'gsap';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  @HostListener('dragover', ['$event']) onDragOver(event: any) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }
  @HostListener('dragenter', ['$event']) onDragEnter(event: any) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }
  @HostListener('dragend', ['$event']) onDragEnd(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }
  @HostListener('dragleave', ['$event']) onDragLeave(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }
  @HostListener('drop', ['$event']) onDrop(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;
      this.saveFiles(files);
    }
  }

  @ViewChild('footerContainer', { static: true }) footerContainer!: ElementRef;
  @ViewChild('title', { static: true }) titleRef!: ElementRef;
  @ViewChild('mainSection', { static: true }) mainSectionRef!: ElementRef;
  @ViewChild('endSection', { static: true }) endSectionRef!: ElementRef;
  @ViewChild('backButton') backButtonRef!: ElementRef;

  myForm!: FormGroup;

  isShowForm = false;
  error?: string;
  dragAreaClass?: string;
  draggedFiles: any;

  constructor(
    private elementRef: ElementRef,
    private fb: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    gsap.registerPlugin();

    this.myForm = this.fb.group({
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      companyNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      category: ['', Validators.required],
      projectInfo: ['', Validators.required],
      attachments: [null, Validators.required],
    });
  }

  contactUs(): void {
    this['isShowForm'] = true;
    this['changeDetectorRef'].detectChanges();

    const footerContainer = this.footerContainer.nativeElement;
    const title = this.titleRef.nativeElement;
    const mainSection = this.mainSectionRef.nativeElement;
    const endSection = this.endSectionRef.nativeElement;
    const backButton = this.backButtonRef.nativeElement;

    gsap.to(footerContainer, { paddingLeft: '220px', duration: 0.5 });

    gsap.to(title, { duration: 0.5, color: '#398BF5' });

    gsap.to(mainSection, {
      display: 'none',
      opacity: 1,
      duration: 0.5,
    });

    gsap.to(endSection, {
      display: 'none',
      opacity: 1,
      duration: 0.5,
    });

    gsap.to(this.elementRef.nativeElement, { background: 'white' });

    gsap.to(backButton, { duration: 0.5 });
  }

  goBack(): void {
    this.isShowForm = false;
    this.changeDetectorRef.detectChanges();
    const footerContainer = this.footerContainer.nativeElement;
    const title = this.titleRef.nativeElement;
    const mainSection = this.mainSectionRef.nativeElement;
    const endSection = this.endSectionRef.nativeElement;

    gsap.to(footerContainer, { paddingLeft: '120px', duration: 0.5 });

    gsap.to(title, { duration: 0.5, color: '#fff' });

    gsap.to(mainSection, {
      display: 'flex',
      opacity: 1,
      duration: 0.5,
    });

    gsap.to(endSection, {
      display: 'grid',
      opacity: 1,
      duration: 0.5,
    });

    gsap.to(this.elementRef.nativeElement, {
      display: 'block',
      minHeight: '615px',
      background:
        'url(../../../../assets/bg/liquid.svg) center bottom/cover no-repeat',
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
    }
  }

  allowDrop(event: Event) {
    event.preventDefault();
  }

  onFileChange(event: any) {
    let files: FileList = event.target.files;
    this.saveFiles(files);
  }

  saveFiles(files: FileList) {
    if (files.length > 1) this.error = 'Only one file at time allow';
    else {
      this.error = '';
      console.log(files[0].size, files[0].name, files[0].type);
      this.draggedFiles = files;
      console.log(files);
    }
  }
}
