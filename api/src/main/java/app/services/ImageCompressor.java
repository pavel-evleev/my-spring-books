package app.services;

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

    public ImageCompressor(MultipartFile image, String compressedFile) {
        this.image = image;
        this.compressedFile = compressedFile;
    }

    public void compressAndSaveImage(MultipartFile image, String compressedFile) throws IOException {

        try (InputStream inputStreamImage = image.getInputStream()) {
            BufferedImage bufferedImage = ImageIO.read(inputStreamImage);
            File compressImageFile = new File("D:\\testImage\\" + compressedFile + ".jpg");

            try (OutputStream outputStream = new FileOutputStream(compressImageFile)) {

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
            } catch (IOException e) {
                throw e;
            }
        } catch (IOException e) {
            e.printStackTrace();
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
