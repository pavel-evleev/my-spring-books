package app.rest.controller;

import app.services.ImageService;
import app.services.UserService;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;


@RestController
@RequestMapping("/v1/img")
public class ImageController extends ApiErrorController {

    private final ImageService imageService;
    private final UserService userService;
    private final String pathImg;

    public ImageController(ImageService imageService, UserService userService, Environment env) {
        this.imageService = imageService;
        this.userService = userService;
        this.pathImg = env.getProperty("image.url");
    }

    @GetMapping(value = "/{image:.+}")
    public ResponseEntity<byte[]> getCover(@PathVariable String image, HttpServletResponse response) {

        byte[] img = imageService.getImage(image);

        if (img != null) {
            response.setHeader(HttpHeaders.CACHE_CONTROL, "public, max-age=" + TimeUnit.DAYS.toSeconds(365));
            response.setHeader(HttpHeaders.PRAGMA, null);

            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG)
                    .body(img);
        }
        return ResponseEntity.noContent().build();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, value = "/change_avatar")
    public ResponseEntity<String> changeAvatar(@RequestParam(value = "file") MultipartFile image,
                                               @RequestParam("userId") Long userId) {
        String compressImage = UUID.randomUUID().toString();
        Optional<String> avatar = userService.getAvatarIfExist(userId);

        // it is necessary for the rational use of memory on dropbox
        //if existed we need delete the avatar image
        if (avatar.isPresent()) {
            imageService.remove(avatar.get());
        }

        imageService.compressAndSaveImage(image, compressImage);
        String uploadedImg = userService.changeAvatar(userId, compressImage);
        return ResponseEntity.ok(pathImg + uploadedImg);
    }


}
