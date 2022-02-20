
//Fixing LinkWindows

inline function linkWindows()
{
	local file;
	
	file = FileSystem.getFolder(FileSystem.Samples);
	file = file.toString(0);
	Console.print(file);
}
