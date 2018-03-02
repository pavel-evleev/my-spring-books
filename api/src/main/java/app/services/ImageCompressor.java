package app.services;

import com.dropbox.core.DbxException;
import com.dropbox.core.v2.DbxClientV2;
import com.tinify.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;

/**
 * Created by Pavel on 24.01.2018.
 */
public class ImageCompressor {

    private float imageQuality = 0.6f;

    private DbxClientV2 client;

    public ImageCompressor(DbxClientV2 client) {
        this.client = client;
        Tinify.setKey("oS1zvr72psQvFSZfsjeiPdnm0GAaNdWg");
    }


    public void compressAndSaveImage(MultipartFile image, String compressedFile) throws IOException {

        byte[] resultBuffer = null;
        try {
            // Use the Tinify API client.
            resultBuffer = Tinify.fromBuffer(image.getBytes()).toBuffer();

        } catch (AccountException e) {
            System.out.println("The error message is: " + e.getMessage());
            // Verify your API key and account limit.
        } catch (ClientException e) {
            // Check your source image and request options.
        } catch (ServerException e) {
            // Temporary issue with the Tinify API.
        } catch (ConnectionException e) {
            // A network connection error occurred.
        } catch (java.lang.Exception e) {
            // Something else went wrong, unrelated to the Tinify API.
        }
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(resultBuffer);
//
//        File targetFile = new File("D:\\testImage\\target.jpg");
//
//        org.apache.commons.io.FileUtils.copyInputStreamToFile(stream,targetFile);
        try {
            client.files().uploadBuilder("/" + compressedFile + ".jpg").uploadAndFinish(byteArrayInputStream);
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
