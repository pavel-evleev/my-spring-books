package app.services;

import com.dropbox.core.DbxDownloader;
import com.dropbox.core.DbxException;
import com.dropbox.core.DbxRequestConfig;
import com.dropbox.core.v2.DbxClientV2;
import com.dropbox.core.v2.files.DeleteResult;
import com.dropbox.core.v2.files.FileMetadata;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

/**
 * Created by Pavel on 24.01.2018.
 */
@Service
public class ImageService {

    private static final String ACCESS_TOKEN = "Nj7jh4RntCAAAAAAAAAAChQOewtSMM4lWqY82zUjEFZPPej9Jo6LCK6IZDtWEHeS";

    private DbxClientV2 client;

    public ImageService() {
        DbxRequestConfig config = new DbxRequestConfig("dropbox/beworm_image");
        this.client = new DbxClientV2(config, ACCESS_TOKEN);
    }

    public void compressAndSaveImage(MultipartFile image, String compressedFile) throws IOException {
        ImageCompressor compressor = new ImageCompressor(client);
        compressor.compressAndSaveImage(image, compressedFile);
    }

    public byte[] getImage(String fileName) {
        byte[] byteFile = null;

//        try {
//            byteFile= FileUtils.readFileToByteArray(new File("D:\\testImage\\target.jpg"));
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
        try {

            DbxDownloader<FileMetadata> download = client.files().download("/" + fileName);
            byteFile = StreamUtils.copyToByteArray(download.getInputStream());
        } catch (DbxException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return byteFile;
    }

    public void remove(String s) {
        try {
            DeleteResult result = client.files().deleteV2("/" + s);
            result.toString();

        } catch (DbxException e) {
            e.printStackTrace();
        }
    }
}
