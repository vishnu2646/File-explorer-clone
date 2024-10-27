interface FileNode {
    name: string;
    children: FileNode[];
    data?: any;
}
  
export function transformData(response: any): FileNode[] {
    const modules: FileNode[] = response.js.Table.map((item: any) => ({
        name: item.targetdoc,
        children: [], // Initialize children as an empty array
    }));
  
    modules.forEach((module: FileNode) => {
        // Loop through all tables dynamically
        Object.keys(response.js).forEach((tableKey: string) => {
            if (tableKey.startsWith('Table') && Array.isArray(response.js[tableKey])) {
                const records = response.js[tableKey].filter(
                    (record: any) => record.ModuleName === module.name
                );
        
                // Append each matching record to the children array
                module.children.push(...records);
            }
        });
    });
  
    return modules;
}
  