import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

import { FileNode, FILE_STRUCTURE } from '../types/types';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        CommonModule,
        MatButtonModule,
        MatTreeModule, 
        MatIconModule,
        MatMenuModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    public treeControl = new NestedTreeControl<FileNode>((node) => node.children);

    public dataSource = new MatTreeNestedDataSource<FileNode>();

    public selectedFolder: FileNode | null = null;

    public displayedFilesAndFolders: FileNode[] = [];

    public breadcrumbPath: FileNode[] = [];

    @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger; // Updated reference

    public selectedFileOrFolder: FileNode | null = null;

    constructor(private cd: ChangeDetectorRef) {
        this.dataSource.data = FILE_STRUCTURE;
    }

    public hasChild = (_: number, node: FileNode) => !!node.children && node.children.length > 0;

    public selectFolder(folder: FileNode): void {
        console.log("selectFolder from menuTrigger", folder);
        if(folder === null) {
            return;
        }

        if (this.selectedFolder === folder) {
            this.treeControl.collapse(folder);
            this.selectedFolder = null;
            this.displayedFilesAndFolders  = [];
        } else {
            // Collapse previously selected folder if it exists
            if (this.selectedFolder) {
                this.treeControl.collapse(this.selectedFolder);
            }

            // Set the selected folder and expand it
            this.selectedFolder = folder;
            this.displayedFilesAndFolders = folder.children || [];
            this.breadcrumbPath.push(folder);
            // this.treeControl.expand(folder);
            this.expandFolderAndChildren(folder);
        }
    }

    public expandFolderAndChildren(folder: FileNode): void {
        this.treeControl.expand(folder);
        if (folder.children) {
            folder.children.forEach((child) => {
                if (child.children) {
                    this.expandFolderAndChildren(child);
                }
            });
        }
    }

    public getAllFiles(folder: FileNode): FileNode[] {
        const files: FileNode[] = [];
        folder.children?.forEach((child) => {
            if (child.type === 'file') {
                files.push(child);
            } else if (child.children) {
                files.push(...this.getAllFiles(child)); // Recursive call for nested folders
            }
        });
        return files;
    }

    openContextMenu(event: MouseEvent, file: FileNode) {
        event.preventDefault(); 
        this.menuTrigger.openMenu();
    }

    public openFolder(folder: FileNode) {
        console.log('open folder', folder);
        // this.selectedFolder = folder
    }

    public navigateTo(folder: FileNode): void {
        this.selectFolder(folder);
    }

    public async handleDetectChanges() {
        await this.cd.detectChanges();
    }
}
