//Crawls the web page and finds the "Latest Version", if the value is higher than "Current Version", notifies the user.

Server.setBaseURL("https://www.iamlamprey.com");

const var Button_UpdateAvailable = Content.getComponent("Button_UpdateAvailable");

const var currentVersion = 0.12;
var latestVersion;

var responseArray;
var responseAsString;

Server.callWithGET("/pages/neat-player-latest-version", "", function(status, response)
{	
	responseArray = response.split(" ");
	
	responseAsString = responseArray.indexOf("Version:");
	
	latestVersion = responseArray[responseAsString + 1];
	
	latestVersion = latestVersion.replace(latestVersion.substring(4, 6), "");
	
	if (currentVersion < latestVersion)
		Button_UpdateAvailable.set("visible", true);
	else
		Button_UpdateAvailable.set("visible", false);	
});


inline function onButton_UpdateAvailableControl(component, value)
{
	if (value)
		Engine.openWebsite("https://www.iamlamprey.com/pages/neat-player");
};

Content.getComponent("Button_UpdateAvailable").setControlCallback(onButton_UpdateAvailableControl);
