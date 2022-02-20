// expHandler
const expHandler = Engine.createExpansionHandler();
reg nest = {};

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

var hrList = [];

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