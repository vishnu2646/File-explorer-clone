import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

import { FileNode, FILE_STRUCTURE } from '../types/types';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatTreeModule,
        MatIconModule,
        MatMenuModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    public treeControl = new NestedTreeControl<FileNode>((node) => node.children);

    public dataSource = new MatTreeNestedDataSource<FileNode>();

    public selectedFolder: FileNode | null = null;

    public displayedFilesAndFolders: FileNode[] = [];

    public breadcrumbPath: FileNode[] = [];

    public selectedFileOrFolder: FileNode | null = null;

    public isEditFileOrFolderName: boolean = false;

    public themeMode: String = 'light';

    public mode: String = 'list';

    @ViewChild('menuTrigger')
    public menuTrigger!: MatMenuTrigger; // Updated reference

    constructor(private cd: ChangeDetectorRef) {
        this.dataSource.data = FILE_STRUCTURE;
    }

    public ngOnInit(): void {
        const theme = localStorage.getItem('mode');
        const mode = localStorage.getItem('type');

        if(theme && mode) {
            this.themeMode = theme;

            this.mode = mode;
            this.handleFolderViewMode(mode);
        } else {
            this.themeMode = 'light';
        }
    }

    public hasChild = (_: number, node: FileNode) => !!node.children && node.children.length > 0;

    public selectFolder(folder: FileNode | null): void {
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
            this.breadcrumbPath = this.getBreadcrumbPath(folder);
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

    public openContextMenu(event: MouseEvent, file: FileNode) {
        event.preventDefault();
        this.selectedFileOrFolder = file;
        this.menuTrigger.openMenu();
    }

    public async handleDetectChanges() {
        await this.cd.detectChanges();
    }

    public handleSetTheme(theme: string) {
        localStorage.setItem('mode', theme);
        this.themeMode = theme;

        const bodyTheme = document.body.classList;

        if(bodyTheme.contains('light')) {
            document.body.classList.remove('light');
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
            document.body.classList.add('light');
        }
    }

    public reameFolderOrFile(node: FileNode  | null) {
        if(!node) {
            return;
        };
        this.isEditFileOrFolderName = !this.isEditFileOrFolderName;
        this.selectedFileOrFolder = node;
        console.log('reameFolderOrFile', this.selectedFileOrFolder);
    }

    public deleteFileOrFolder(node: FileNode | null) {
        if(!node) {
            return;
        }

        this.displayedFilesAndFolders = this.displayedFilesAndFolders.filter(dnode => dnode.name !== node.name);
    }

    private  getBreadcrumbPath(folder: FileNode): FileNode[] {
        const path: FileNode[] = [];
        let current: FileNode | null = folder;

        while (current) {
            path.unshift(current);
            current = this.findParent(current, this.dataSource.data);
        }
        return path;
    }

    private findParent(node: FileNode, nodes: FileNode[]): FileNode  | null{
        const stack: { currentNode: FileNode; parent: FileNode | null }[] = nodes.map(n => ({ currentNode: n, parent: null }));

        while (stack.length) {
            const { currentNode, parent } = stack.pop()!;

            // If the node's children contain the target node, we found the parent
            if (currentNode.children && currentNode.children.includes(node)) {
                return currentNode;
            }

            // If there are children, push them onto the stack with the current node as their parent
            if (currentNode.children) {
                currentNode.children.forEach(child =>
                    stack.push({ currentNode: child, parent: currentNode })
                );
            }
        }

        // Return null if no parent is found
        return null
    }

    public handleFolderViewMode(mode: string): void {
        console.log("handleFolderViewMode", mode);
        localStorage.setItem('type', mode);
        this.mode = mode;

        // const bodyTheme = document.body.classList;

        // if(bodyTheme.contains('light')) {
        //     document.body.classList.remove('light');
        //     document.body.classList.add('dark');
        // } else {
        //     document.body.classList.remove('dark');
        //     document.body.classList.add('light');
        // }
    }
}
