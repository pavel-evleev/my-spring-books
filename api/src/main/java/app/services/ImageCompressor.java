package app.services;

import com.dropbox.core.DbxException;
import com.dropbox.core.DbxRequestConfig;
import com.dropbox.core.v2.DbxClientV2;
import com.dropbox.core.v2.files.FileMetadata;
import com.dropbox.core.v2.files.UploadErrorException;
import com.sun.xml.internal.messaging.saaj.util.ByteInputStream;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.Iterator;

/**
 * Created by Pavel on 24.01.2018.
 */
public class ImageCompressor implements Runnable {

    private float imageQuality = 0.6f;

    private MultipartFile image;

    private String compressedFile;

    private DbxClientV2 client;


    public ImageCompressor(MultipartFile image, String compressedFile, DbxClientV2 client) {
        this.image = image;
        this.compressedFile = compressedFile;
        this.client = client;
    }


    public void compressAndSaveImage(MultipartFile image, String compressedFile) throws IOException {

        try (InputStream inputStreamImage = image.getInputStream()) {

            BufferedImage bufferedImage = ImageIO.read(inputStreamImage);

            try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

                Iterator<ImageWriter> imageWriters = ImageIO.getImageWritersByFormatName("jpg");
                if (!imageWriters.hasNext())
                    throw new IllegalStateException("Writers Not Found!!");

                ImageWriter imageWriter = (ImageWriter) imageWriters.next();
                try (ImageOutputStream imageOutputStream = ImageIO.createImageOutputStream(outputStream)) {
                    imageWriter.setOutput(imageOutputStream);
                    ImageWriteParam imageWriteParam = imageWriter.getDefaultWriteParam();

                    imageWriteParam.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
                    imageWriteParam.setCompressionQuality(imageQuality);

                    imageWriter.write(null, new IIOImage(bufferedImage, null, null), imageWriteParam);
                    imageWriter.dispose();
                } catch (IOException e) {
                    throw e;
                }
                byte[] byteImage = outputStream.toByteArray();

                ByteInputStream byteInputStream = new ByteInputStream(byteImage, byteImage.length);
                FileMetadata metadata = client.files().uploadBuilder("/" + compressedFile + ".jpg")
                    .uploadAndFinish(byteInputStream);

            } catch (IOException e) {
                throw e;
            } catch (UploadErrorException e) {
                e.printStackTrace();
            } catch (DbxException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void run() {
        try {
            compressAndSaveImage(image, compressedFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
