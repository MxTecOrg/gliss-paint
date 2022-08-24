package com.mxtecorg.glisspaint;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Build;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.widget.Toast;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import es.dmoral.toasty.*;
import android.view.*;
import java.io.*;

public class JavaScriptInterface
{
    private Activity act;
	private Context ctx;
	private Vibrator vibrator;

	public JavaScriptInterface(Context ctx)
	{
		this.ctx = ctx;
		this.vibrator = (Vibrator) ctx.getSystemService(Context.VIBRATOR_SERVICE);
	}



	@JavascriptInterface
	public void toast(String text , String type)
	{
		switch (type)
		{
			case "error":
		        Toasty.error(ctx, text, Toast.LENGTH_SHORT, true).show();
				break;
			case "success":
				Toasty.success(ctx, text, Toast.LENGTH_SHORT, true).show();
				break;
			case "warn":
				Toasty.warning(ctx, text, Toast.LENGTH_SHORT, true).show();
				break;
			case "info":
				Toasty.success(ctx, text, Toast.LENGTH_SHORT, true).show();
				break;
			default:
			    Toasty.normal(ctx, text).show();
				break;
		}
	}





	@JavascriptInterface
	public void askPerms(String perm)
	{
		String permission = permissions(perm);

		try
		{
			if (Build.VERSION.SDK_INT >= 23) ActivityCompat.requestPermissions(act,
																			   new String[]{permission},
																			   1);
		}
		catch (Exception e)
		{
			toast("" + e , "error");
		}
	}

	@JavascriptInterface
	public String checkPerms(String perm)
	{
		String perms = permissions(perm);
		if (perms.equals("")) return "not_found";
		if (ContextCompat.checkSelfPermission(ctx, perms) != PackageManager.PERMISSION_GRANTED)
		{
            return "false";
        }
		return "true";
	}

	private String permissions(String perm)
	{
		switch (perm)
		{
			case "STORAGE":
				return Manifest.permission.WRITE_EXTERNAL_STORAGE;
			default:
				return "";
		}
	}

	@JavascriptInterface
	public void vibrate(long time)
	{
	    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
		{
			vibrator.vibrate(VibrationEffect.createOneShot(time, VibrationEffect.DEFAULT_AMPLITUDE));
		}
		else
		{
			vibrator.vibrate(time);
		}
	}


	@JavascriptInterface
	public String listDir(String _path)
	{
		try
		{
			File path = new File(_path);
			File[] directory = path.listFiles();
			String list = "";

			for (File file : directory)
			{
				if (list != "") list += ",";
				list += file.getName();
			}
			return list;
		}
		catch (Exception e)
		{
			return "__ERROR__," + e;
		}
	}


	@JavascriptInterface
	public String readFile(String _path)
	{

		try
		{
		    File file = new File(_path);

			StringBuilder text = new StringBuilder();


			BufferedReader br = new BufferedReader(new FileReader(file));
			String line;

			while ((line = br.readLine()) != null)
			{
				text.append(line);
				text.append('\n');
			}
			br.close();
			return  "DONE||||||||||" + text.toString();
		}
		catch (FileNotFoundException e)
		{
			return "ERROR||||||||||" + e;
	    }
		catch (IOException e)
		{
			return "ERROR||||||||||" + e;
		}
		catch (Exception e)
		{
			return "ERROR||||||||||" + e;
	    }
	}


	@JavascriptInterface
	public String writeFile(String path , String content , boolean append)
	{
		try
		{
			File file = new File(path);
			if (append)
			{
				FileOutputStream fos = new FileOutputStream(file , true);

				OutputStreamWriter out = new OutputStreamWriter(fos); 
				out.append(content);
				out.flush();
				out.close();
				return "DONE";
			}
		    FileOutputStream fos = new FileOutputStream(file);

			fos.write(content.getBytes());

			fos.flush();
			fos.close();
			return "DONE";
		}
		catch (FileNotFoundException e)
		{
			return "ERROR||||||||||" + e;
	    }
		catch (IOException e)
		{
			return "ERROR||||||||||" + e;
		}
		catch (Exception e)
		{
			return "ERROR||||||||||" + e;
	    }
	}

	@JavascriptInterface
	public String createDir(String path)
	{
		try
		{
			File folder = new File(path);
			if (folder.mkdir())
			{
				return "done";
			}
			else return "false";

		}
		catch (Exception e)
		{
			return "ERROR||||||||||" + e;
	    }
	}


	@JavascriptInterface
	public void exitApp()
	{
		MainActivity.getmInstanceActivity().exitApp();
	}

	@JavascriptInterface
	public String fileExists(String path)
	{
		try
		{
			File file = new File(path);
			if (file.exists()) return "true";
			else return "false";
		}
		catch (Exception e)
		{
			return "ERROR||||||||||" + e;
	    }
	}

	@JavascriptInterface
	public String isFile(String path)
	{
		try
		{
			File file = new File(path);
			if (file.isFile()) return "true";
			else return "false";
		}
		catch (Exception e)
		{
			return "ERROR||||||||||" + e;
	    }
	}

	@JavascriptInterface
	public String isFolder(String path)
	{
		try
		{
			File file = new File(path);
			if (file.isDirectory()) return "true";
			else return "false";
		}
		catch (Exception e)
		{
			return "ERROR||||||||||" + e;
	    }
	}


	@JavascriptInterface
	public void setStatusBarColor(String color , String color2)
	{
	    MainActivity.getmInstanceActivity().setStatusBarColor(color , color2);

	}

	@JavascriptInterface
	public void log(String tag , String msg)
	{
		Log.i(tag , msg);
	}

}
