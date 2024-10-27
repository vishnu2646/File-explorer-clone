import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NestedTreeControl } from '@angular/cdk/tree';
import { FileNode } from '../types/types';

// FILE_STRUCTURE
import { CommonModule } from '@angular/common';
import { data } from '../data/data';
import { transformData } from '../utils/transformData';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        CommonModule,
        MatButtonModule,
        MatTreeModule,
        MatTableModule,
        MatIconModule,
        MatSidenavModule,
        MatCardModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    private activatedRoute = inject(ActivatedRoute);

    private isMobile = false;

    private breakPointObserver = inject(BreakpointObserver);

    private unsubscribe$ = new Subject<void>();

    private mdlId = 0;

    public toggleSideNav = true;

    public treeControl = new NestedTreeControl<FileNode>(node => node.children);

    public dataSource = new MatTreeNestedDataSource<FileNode>();

    public selectedFolder: FileNode = {} as FileNode;

    public displayedFilesAndFolders: any[] = [];

    public displayedColumns: string[] = [];

    constructor() {
        this.dataSource.data = transformData(data);
    }

    public ngOnInit(): void {
        this.activatedRoute.queryParams.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
            this.mdlId = params['mdlId'];
            this.handleGetData(this.mdlId);
        });

        // Detect the site is opened in Mobile screen using the window size.
        this.breakPointObserver.observe([Breakpoints.Handset]).subscribe(result => this.isMobile = result.matches);

        // If not Mobile screen the sidebar will be opened by default.
        // Else sidebar will be closed by default.
        if(this.isMobile) {
            this.toggleSideNav = !this.toggleSideNav;
        }

    }

    public hasChild = (_: number, node: FileNode) => !!node.children && node.children.length > 0;

    public selectFolder(node: FileNode) {
        this.selectedFolder = node;
        this.displayedFilesAndFolders = node.children || [];

        // Dynamically extract column headers from the first element in children
        if (this.displayedFilesAndFolders.length > 0) {
            this.displayedColumns = Object.keys(this.displayedFilesAndFolders[0]);
        } else {
            this.displayedColumns = [];
        }

        if(this.isMobile) {
            this.handleToggleSideNav();
        }
    }

    public handleToggleSideNav() {
        this.toggleSideNav = !this.toggleSideNav
    }

    public async handleGetData(id: number): Promise<void> {
        if(!id) {
            return;
        } 
        await console.log("handleGetData", id);
    }
}
