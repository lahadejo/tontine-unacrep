import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren
} from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  imports: [],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.css'
})
export class HowItWorks implements AfterViewInit {

  @ViewChildren('timelineItem')
  timelineItems!: QueryList<ElementRef>;

  ngAfterViewInit(): void {

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            const element = entry.target as HTMLElement;

            element.classList.add('timeline-visible');

            observer.unobserve(element);
          }

        });

      },
      {
        threshold: 0.2
      }
    );

    this.timelineItems.forEach((item) => {
      observer.observe(item.nativeElement);
    });
  }
}
