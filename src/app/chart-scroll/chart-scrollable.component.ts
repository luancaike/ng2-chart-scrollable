import { AfterViewInit, Component, ContentChild, ElementRef, Input, ViewChild } from '@angular/core';
import { ChartXAxe } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'chart-scrollable',
    template: `
        <div #wrapper class="chart-scroll-wrapper">
            <div class="content" (wheel)="onScrollEvent($event)">
                <ng-content></ng-content>
            </div>
            <div *ngIf="axis === 'y'" class="slider-wrapper-vertical">
                <input #scroll class="range round" type="range" min="1" max="1" step=".1" value="1" />
            </div>
            <div *ngIf="axis === 'x'" class="slider-wrapper-horizontal">
                <input #scroll class="range round" type="range" min="1" step=".1" value="1" />
            </div>
        </div>
    `,
    styleUrls: ['./chart-scrollable.component.scss']
})
export class ChartScrollableComponent implements AfterViewInit {
    @ViewChild('scroll') scroll: ElementRef<HTMLInputElement>;
    @ViewChild('wrapper') wrapper: ElementRef<HTMLDivElement>;
    @ContentChild(BaseChartDirective) chartComponent: BaseChartDirective;
    @Input() step = 10;
    @Input() axis = 'x';
    public labels = [];

    onScrollEvent($event) {
        $event.preventDefault();
        if ($event.deltaY < 0) {
            this.scroll.nativeElement.value = `${+this.scroll.nativeElement.value - 1}`;
        } else {
            this.scroll.nativeElement.value = `${+this.scroll.nativeElement.value + 1}`;
        }
        this.scrollEvent(+this.scroll.nativeElement.value);
    }

    ngAfterViewInit() {
        this.initChartConfig();
    }

    paginate(array, page_size, page_number) {
        return array.slice(page_number - 1, page_number - 1 + page_size);
    }

    scrollEvent(value, preventCollateral = false) {
        value = Math.round(value);
        const min = this.paginate(this.labels, this.step, value)[0];
        const max = this.paginate(this.labels, this.step, value)[this.step - 1];
        const axes = this.axis === 'x' ? 'xAxes' : 'yAxes';

        const axesConfig = {};
        axesConfig[axes] = (this.chartComponent.chart.options.scales[axes] as ChartXAxe[]).map(el => ({
            ...el,
            beforeUpdate: () => {
                this.setupScroll();
                this.scrollEvent(1, true);
            },
            ticks: {
                ...el.ticks,
                min,
                max
            }
        }));
        this.chartComponent.chart.options = {
            ...this.chartComponent.chart.options,
            scales: {
                ...this.chartComponent.chart.options.scales,
                ...axesConfig
            }
        };
        if (!preventCollateral) {
            this.chartComponent.chart.update();
        }
    }

    setupScroll() {
        if (!this.chartComponent?.chart?.config.data.labels) {
            return;
        }
        if (this.labels.toString() !== this.chartComponent.chart.config.data.labels.toString()) {
            this.scroll.nativeElement.value = '1';
        }
        const widthVertical = `${this.wrapper.nativeElement.offsetHeight}px`;
        const sliderWrapperVertical = this.wrapper.nativeElement.querySelector<HTMLDivElement>(
            '.slider-wrapper-vertical'
        );
        if (sliderWrapperVertical) {
            sliderWrapperVertical.style.setProperty('--width-vertical', widthVertical);
        }
        this.scroll.nativeElement.style.setProperty('--width-vertical', widthVertical);
        this.labels = this.chartComponent.chart.config.data.labels;
        const pages = Math.max(this.labels.length - this.step + 1, 1);
        this.scroll.nativeElement.style.setProperty('--width', Math.max(10, 100 / pages) + '%');
        if (pages === 1) {
            this.scroll.nativeElement.style.display = 'none';
        } else {
            this.scroll.nativeElement.style.display = 'block';
        }
        this.scroll.nativeElement.max = `${pages}`;
    }

    initChartConfig() {
        this.setupScroll();
        this.scrollEvent(1);
        this.scroll.nativeElement.addEventListener('input', (event: any) =>
            this.scrollEvent(parseInt(event.target.value))
        );
    }
}
