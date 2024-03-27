package com.superapp.miniapp;

import com.facebook.react.bridge.ReactContext;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class MiniAppBundle {
    private static ReactContext reactContext;

    public void unzip(String zipFile, String location) throws IOException {
        System.out.println("TODO: unzip :: begin ::");

        try {
            File f = new File(location);
            if (!f.isDirectory()) {
                f.mkdirs();
            }
            System.out.println("TODO: unzip :: mkdir ::" + zipFile);
            ZipInputStream zin = new ZipInputStream(new FileInputStream(zipFile));
            try {
                ZipEntry ze = null;
                System.out.println("TODO: unzip :: try" );

                File fx = new File("/data/user/0/com.superapp/files");
                File file[] = fx.listFiles();
                System.out.println("TODO: path ::" + file.toString());
                while ((ze = zin.getNextEntry()) != null) {
                    String path = location + File.separator + ze.getName();
                    System.out.println("TODO: path ::" + path);
                    if (ze.isDirectory()) {
                        File unzipFile = new File(path);
                        if (!unzipFile.isDirectory()) {
                            unzipFile.mkdirs();
                        }
                    } else {
                        FileOutputStream fout = new FileOutputStream(path, false);

                        try {
                            for (int c = zin.read(); c != -1; c = zin.read()) {
                                fout.write(c);
                            }
                            zin.closeEntry();
                        } finally {
                            fout.close();
                        }
                    }
                }
            } finally {
                zin.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void downloadFileInInternalStorage(String link, String fileName, String zipFile) throws IOException {
        String buildDirName = "build";
        String mFileName = fileName.replace(" ", "_")
                .replace(Pattern.compile("[.][.]+").pattern(), ".");
        String baseFolder;
        baseFolder = reactContext.getFilesDir().getAbsolutePath();
        String filePath = baseFolder + "/" + buildDirName + "/" + mFileName;
        String zipFilePath = baseFolder + "/" + zipFile;

        File file = new File(filePath);
        System.out.println("TODO: Check file path: " + filePath);
        if (file.exists()) {
            System.out.println("TODO: Exist: " + file.getUsableSpace() + ", " + file.getTotalSpace());
        } else {
            Request request = new Request.Builder()
                    .url(link)
                    .build();
            OkHttpClient client = new OkHttpClient.Builder()
                    .build();

            Response response = client.newCall(request).execute();
            if (!response.isSuccessful()) {
                throw new IOException("Failed to download file: " + response);
            }
            System.out.println("TODO: download... ");

            FileOutputStream fos = new FileOutputStream(new File(baseFolder, zipFile), true);
            fos.write(response.body().bytes());
            System.out.println("TODO: file: " + filePath);
            fos.close();
            unzip(zipFilePath, baseFolder);
        }
    }

    public void setContext(ReactContext context) {
        reactContext = context;
    }
}
