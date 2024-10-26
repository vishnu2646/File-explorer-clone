export interface FileNode {
    name: string;
    type: 'file' | 'folder';
    children?: FileNode[];
}
  
export const FILE_STRUCTURE: FileNode[] = [
    {
        name: 'Documents',
        type: 'folder',
        children: [
            { 
                name: 'Resume.docx', 
                type: 'file' 
            },
            {
                name: 'Project', 
                type: 'folder', 
                children: [
                    { 
                        name: 'Proposal.pdf', 
                        type: 'file' 
                    }
                ] 
            },
        ],
    },
    {
        name: 'Pictures',
        type: 'folder',
        children: [
            { 
                name: 'Vacation.jpg', 
                type: 'file' 
            }
        ],
    },
    {
        name: 'Documents',
        type: 'folder',
        children: [
            { 
                name: 'Resume.docx', 
                type: 'file' 
            },
            { 
                name: 'Project', 
                type: 'folder', 
                children: [
                    { 
                        name: 'Proposal.pdf', 
                        type: 'file' 
                    }
                ] 
            },
        ],
    },
    {
        name: 'Pictures',
        type: 'folder',
        children: [{ name: 'Vacation.jpg', type: 'file' }],
    },
    {
        name: 'Documents',
        type: 'folder',
        children: [
            { name: 'Resume.docx', type: 'file' },
            { name: 'Project', type: 'folder', children: [{ name: 'Proposal.pdf', type: 'file' }] },
        ],
    },
    {
        name: 'Pictures',
        type: 'folder',
        children: [{ name: 'Vacation.jpg', type: 'file' }],
    },
];
  