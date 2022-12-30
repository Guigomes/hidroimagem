import { NgModule } from '@angular/core';

import {MatGridListModule} from '@angular/material/grid-list';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';

import {MatIconModule} from '@angular/material/icon';

@NgModule({
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatButtonModule,
        FormsModule,
        MatCardModule,
        MatGridListModule

    ],
    exports:[
      MatFormFieldModule,
      MatInputModule,
      MatToolbarModule,
      MatIconModule,
      MatSelectModule,
      ReactiveFormsModule,
      MatButtonModule,
      FormsModule,
      MatCardModule,
      MatGridListModule
    ]

})
export class MaterialModule { }
