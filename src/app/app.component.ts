import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  width: number = 0;
  height: number = 0;
  p: number[] = [];
  fps: number = 20;
  color: string = "#0f0";
  charset: string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  size: number = 10;
  interval: any;
  isPaused: boolean = false;

  ngOnInit() {
    this.canvas = document.querySelector('canvas')!;
    this.ctx = this.canvas.getContext('2d')!;
    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.draw();
    this.interval = setInterval(() => this.draw(), 1000 / this.fps);

    window.addEventListener("keydown", (event) => {
      if (event.key === " ") {
        this.togglePause();
      }
    });
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.p = Array(Math.ceil(this.width / this.size)).fill(0);
  }

  draw() {
    if (this.isPaused) {
      return;
    }

    this.ctx.fillStyle = "rgba(0,0,0,.05)";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.color;
    this.ctx.font = '15px Courier';

    for (let i = 0; i < this.p.length; i++) {
      let v = this.p[i];
      this.ctx.fillText(
        this.random(this.charset.split('')),
        i * this.size,
        v
      );

      this.p[i] = v >= this.height || v >= 10000 * Math.random() ? 0 : v + this.size + 10;
    }
  }

  random(items: any[]): any {
    return items[Math.floor(Math.random() * items.length)];
  }

  togglePause() {
    this.isPaused = !this.isPaused;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
