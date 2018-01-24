package app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * Created by Pavel on 24.01.2018.
 */
@Service
public class ImageService {

    @Autowired
    private ThreadPoolTaskExecutor taskExecutor;

    public void compressAndSaveImage(MultipartFile image, String compressedFile) {
        ImageCompressor compressor = new ImageCompressor(image, compressedFile);
        taskExecutor.execute(compressor);
    }

    public byte[] getImage(String fileName) {
        byte[] byteFile = null;
        File file = new File("D:\\testImage\\" + fileName);
        try (InputStream stream = new FileInputStream(file)) {
            byteFile = StreamUtils.copyToByteArray(stream);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return byteFile;
    }
}
