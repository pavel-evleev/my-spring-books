package app.dropbox;

import com.dropbox.core.DbxDownloader;
import com.dropbox.core.DbxException;
import com.dropbox.core.DbxRequestConfig;
import com.dropbox.core.v2.DbxClientV2;
import com.dropbox.core.v2.files.FileMetadata;
import com.dropbox.core.v2.users.FullAccount;
import org.junit.Test;
import org.springframework.util.StreamUtils;

import java.io.IOException;

/**
 * Created by Pavel on 10.02.2018.
 */
public class DropboxTestApi {

    private static final String ACCESS_TOKEN = "Nj7jh4RntCAAAAAAAAAAChQOewtSMM4lWqY82zUjEFZPPej9Jo6LCK6IZDtWEHeS";

    @Test
    public void dropboxClientConnection() throws DbxException {
        // Create Dropbox client
        DbxRequestConfig config = new DbxRequestConfig("dropbox/beworm_image");
        DbxClientV2 client = new DbxClientV2(config, ACCESS_TOKEN);

        FullAccount account = client.users().getCurrentAccount();
        System.out.println(account.getName().getDisplayName());

        DbxDownloader<FileMetadata> download = client.files().download("/2e66d193-98ca-4fa3-b832-a6a7b89cb985.jpg");

        try {
            byte[] fileByte = StreamUtils.copyToByteArray(download.getInputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
