import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Gestion } from './Componentes/gestion/gestion';

export const routes: Routes = [
    {
        path : 'gestion',
        component : Gestion
    },
    {
    path: '',
    redirectTo: 'gestion',
    pathMatch: 'full'
   }
];
