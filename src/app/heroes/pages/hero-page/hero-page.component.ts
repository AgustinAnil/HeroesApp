import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit{

  public hero?: Hero;

  constructor(private heroesService: HeroesService,
              private acitvatedRoute: ActivatedRoute,
              private router: Router
            ){}


  // Basicamente obtengo el id del parametro de la url, de ese id corroboro si existe el heroe,
  // si existe lo muestro sino lo redirecciono a list gracias a router.
  ngOnInit(): void {
    this.acitvatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.heroesService.getHeroById(id)),
    ).subscribe(hero => {
      if (!hero) return this.router.navigate(['/heroes/list']);

      this.hero = hero;
      return;
      });
  }

  goBack(): void {
    this.router.navigateByUrl('heroes/list');
  }
}
