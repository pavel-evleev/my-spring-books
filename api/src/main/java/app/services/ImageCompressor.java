package app.services;

import com.dropbox.core.DbxException;
import com.dropbox.core.v2.DbxClientV2;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

/**
 * Created by Pavel on 24.01.2018.
 */
public class ImageCompressor {

    private float imageQuality = 0.6f;

    private DbxClientV2 client;


    public ImageCompressor(DbxClientV2 client) {
        this.client = client;
    }


    public void compressAndSaveImage(MultipartFile image, String compressedFile) throws IOException {

        InputStream inputStream = image.getInputStream();
//
//        File targetFile = new File("D:\\testImage\\target.jpg");
//
//        org.apache.commons.io.FileUtils.copyInputStreamToFile(stream,targetFile);

        try {
            client.files().uploadBuilder("/" + compressedFile + ".jpg").uploadAndFinish(inputStream);
        } catch (DbxException e) {
            e.printStackTrace();
        }

//
//        try {
//
//        } catch (DbxException e) {
//            e.printStackTrace();
//        }
//
//        try (InputStream inputStreamImage = image.getInputStream()) {
//
//            BufferedImage bufferedImage = null;
//            bufferedImage = ImageIO.read(inputStreamImage);
//
//            try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
//
//                Iterator<ImageWriter> imageWriters = ImageIO.getImageWritersByFormatName("jpg");
//                if (!imageWriters.hasNext())
//                    throw new IllegalStateException("Writers Not Found!!");
//
//                ImageWriter imageWriter = (ImageWriter) imageWriters.next();
//                try (ImageOutputStream imageOutputStream = ImageIO.createImageOutputStream(outputStream)) {
//                    imageWriter.setOutput(imageOutputStream);
//                    ImageWriteParam imageWriteParam = imageWriter.getDefaultWriteParam();
//
//                    imageWriteParam.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
//                    imageWriteParam.setCompressionQuality(imageQuality);
//
//                    imageWriter.write(null, new IIOImage(bufferedImage, null, null), imageWriteParam);
//                    imageWriter.dispose();
//                } catch (IOException e) {
//                    throw e;
//                }
//                byte[] byteImage = outputStream.toByteArray();
//
//                ByteArrayInputStream byteInputStream = new ByteArrayInputStream(byteImage);
//
//                client.files().uploadBuilder("/" + compressedFile + ".jpg").uploadAndFinish(byteInputStream);
//            } catch (IOException e) {
//                throw e;
//            } catch (UploadErrorException e) {
//                e.printStackTrace();
//            } catch (DbxException e) {
//                e.printStackTrace();
//            }
//        }
    }

}
