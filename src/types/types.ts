export interface FileNode {
    name: string;
    children: FileNode[];
    data?: any;
}
  
// export const FILE_STRUCTURE: FileNode[] = [
//     {
//         name: 'Documents',
//         type: 'folder',
//         children: [
//             { 
//                 name: 'Resume.docx', 
//                 type: 'file',
//                 url: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
//             },
//             {
//                 name: 'Project', 
//                 type: 'folder', 
//                 children: [
//                     { 
//                         name: 'Proposal.pdf', 
//                         type: 'file' 
//                     }
//                 ] 
//             },
//         ],
//     },
//     {
//         name: 'Pictures',
//         type: 'folder',
//         children: [
//             { 
//                 name: 'Vacation.jpg', 
//                 type: 'file' 
//             }
//         ],
//     },
//     {
//         name: 'Documents',
//         type: 'folder',
//         children: [
//             { 
//                 name: 'Resume.docx', 
//                 type: 'file' 
//             },
//             { 
//                 name: 'Project', 
//                 type: 'folder', 
//                 children: [
//                     { 
//                         name: 'Proposal.pdf', 
//                         type: 'file' 
//                     }
//                 ] 
//             },
//         ],
//     },
//     {
//         name: 'Pictures',
//         type: 'folder',
//         children: [{ name: 'Vacation.jpg', type: 'file' }],
//     },
//     {
//         name: 'Documents',
//         type: 'folder',
//         children: [
//             { name: 'Resume.docx', type: 'file' },
//             { name: 'Project', type: 'folder', children: [{ name: 'Proposal.pdf', type: 'file' }] },
//         ],
//     },
//     {
//         name: 'Pictures',
//         type: 'folder',
//         children: [{ name: 'Vacation.jpg', type: 'file' }],
//     },
// ];
  