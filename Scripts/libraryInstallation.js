const var Panel_InstallLibraries = Content.getComponent("Panel_InstallLibraries");
const var Button_AddLibrary = Content.getComponent("Button_AddLibrary");

const var Button_InstallLibrary = Content.getComponent("Button_InstallLibrary");
const var Button_BulkInstall = Content.getComponent("Button_BulkInstall");

const var Button_CloseInstallPanel = Content.getComponent("Button_CloseInstallPanel");

const expHandler = Engine.createExpansionHandler();
reg nest = {};
var hrList = [];

//Open Panel

inline function onButton_AddLibraryControl(component, value)
{
    if (value)
        closePanels(Button_AddLibrary);
    Panel_InstallLibraries.showControl(value);
};

Content.getComponent("Button_AddLibrary").setControlCallback(onButton_AddLibraryControl);

//Close Panel

inline function onButton_CloseInstallPanelControl(component, value)
{
    if (value)
        closePanels("none");
};

Content.getComponent("Button_CloseInstallPanel").setControlCallback(onButton_CloseInstallPanelControl);

//Library Installation

//Single

inline function onButton_InstallLibraryControl(component, value)
{
   if (value)
       {
        Engine.showYesNoWindow("Install Library", "Please select the .hr1 file.", function(response)
        {
            if (!response) return;
   
            FileSystem.browse(FileSystem.Downloads, false, "*.hr1", function(f)
            {
                nest.hr = f;
                
                if (f.isFile())
                {
                    Engine.showYesNoWindow("Target Directory", "Please select the folder to install the samples to.", function(response)
                    {
                        if (!response) return;
   
                        FileSystem.browseForDirectory(FileSystem.Downloads, function(dir)
                        {
                            if (dir.isDirectory())
                                expHandler.installExpansionFromPackage(nest.hr, dir);
                        });
                    });
                }
            });
        });
       }
};

Content.getComponent("Button_InstallLibrary").setControlCallback(onButton_InstallLibraryControl);

//Bulk

inline function onButton_BulkInstallControl(component, value)
{
    if (value)
           {
            Engine.showYesNoWindow("Bulk Install", "Please select the folder containing the .hr1 files.", function(response)
            {
                if (!response) return;
       
                FileSystem.browseForDirectory(FileSystem.Downloads, function(f)
                {
                    if (f.isDirectory())
                    {
                        hrList = FileSystem.findFiles(f, "*.hr1", 0);
                        Engine.showYesNoWindow("Target Directory", "Please select the folder to install the samples to.", function(response)
                        {
                            if (!response) return;
       
                            FileSystem.browseForDirectory(FileSystem.Downloads, function(dir)
                            {
                                if (dir.isDirectory())
                                    for (h in hrList)
                                        expHandler.installExpansionFromPackage(h, dir);
                            });
                        });
                    }
                });
            });
           }
};

Content.getComponent("Button_BulkInstall").setControlCallback(onButton_BulkInstallControl);