package app.services;

import com.dropbox.core.DbxDownloader;
import com.dropbox.core.DbxException;
import com.dropbox.core.DbxRequestConfig;
import com.dropbox.core.v2.DbxClientV2;
import com.dropbox.core.v2.files.FileMetadata;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

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
        ImageCompressor compressor = new ImageCompressor(image, compressedFile, client);
        compressor.compressAndSaveImage(image,compressedFile);
    }

    public byte[] getImage(String fileName) {
        byte[] byteFile = null;
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
}
