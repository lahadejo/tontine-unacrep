import { Component } from '@angular/core';

import { Navbar } from '../navbar/navbar';
import { Hero } from '../hero/hero';
import { Solution } from '../solution/solution';
import { Features } from '../features/features';
import { HowItWorks } from '../how-it-works/how-it-works';
import { About } from '../about/about';
import { Contact } from '../contact/contact';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    Navbar,
    Hero,
    Solution,
    Features,
    HowItWorks,
    About,
    Contact,
    Footer
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {}

