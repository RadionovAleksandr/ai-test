import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainComponent } from './pages/main/main.component';
import { CreateBookComponent } from './pages/create-book/create-book.component';
import { EditBookComponent } from './pages/edit-book/edit-book.component';
import { ListBookComponent } from './components/list-book/list-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { BookComponent } from './components/book/book.component';
import { UploadComponent } from './components/upload/upload.component';

registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MainComponent,
    CreateBookComponent,
    EditBookComponent,
    ListBookComponent,
    BookComponent,
    UploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
