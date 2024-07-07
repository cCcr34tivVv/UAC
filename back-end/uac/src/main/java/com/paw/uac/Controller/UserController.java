package com.paw.uac.Controller;

import com.paw.uac.Dto.LoginDto;
import com.paw.uac.Dto.RegisterDto;
import com.paw.uac.Dto.TokenDto;
import com.paw.uac.Dto.ViewDto;
import com.paw.uac.Service.interfaces.ITokenService;
import com.paw.uac.Service.interfaces.IUserService;
import com.paw.uac.exception.EmailAlreadyExistsException;
import com.paw.uac.exception.UserDoesNotExistsException;
import com.paw.uac.exception.UsernameAlreadyExistsException;
import com.paw.uac.exception.UsernameOrPasswordIsIncorrectException;
import com.paw.uac.models.User;
import io.jsonwebtoken.JwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/uac")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private IUserService userService;

    @Autowired
    private ITokenService tokenService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<TokenDto> login(@RequestBody LoginDto loginDto){
        try{
            int userId = userService.getUserByUsernameAndPassword(loginDto.getUsername(), loginDto.getPassword());
            String token = tokenService.generateJwtToken(userId);

            return ResponseEntity.ok(new TokenDto(token));
        }
        catch (UsernameOrPasswordIsIncorrectException exception){
            return ResponseEntity.badRequest().build();
        }  catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @RequestMapping (value = "/", method = RequestMethod.POST)
    public ResponseEntity<Void> add (@RequestBody RegisterDto request) {
        try {
            userService.add(request);
            return ResponseEntity.ok().build();
        } catch (UsernameAlreadyExistsException exception) {
            return ResponseEntity.badRequest().build();
        } catch (EmailAlreadyExistsException exception) {
            return ResponseEntity.notFound().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @RequestMapping (value = "/password", method = RequestMethod.PUT)
    public ResponseEntity<Void> changePassword (@RequestHeader String token, @RequestParam String password) {
        try {
            int id = tokenService.decryptJwtToken(token);
            userService.changePassword(id, password);
            return ResponseEntity.ok().build();
        } catch (JwtException exception) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } catch (UserDoesNotExistsException exception) {
            return ResponseEntity.notFound().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @RequestMapping (value = "/", method = RequestMethod.DELETE)
    public ResponseEntity<Void>deleteUser(@RequestHeader String token){
        try{
            int id = tokenService.decryptJwtToken(token);
            userService.deleteUser(id);
            return ResponseEntity.ok().build();
        }catch (JwtException exception){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }catch (UserDoesNotExistsException exception) {
            return ResponseEntity.notFound().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @RequestMapping(value = "/view", method = RequestMethod.GET)
    public ResponseEntity<ViewDto>viewUser(@RequestHeader String token){
        try{
            int id = tokenService.decryptJwtToken(token);
            User user = userService.getById(id);
            return ResponseEntity.ok(new ViewDto(user.getUsername()));
        }catch (UserDoesNotExistsException exception){
            return ResponseEntity.notFound().build();
        }catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @RequestMapping(value = "/permission", method = RequestMethod.GET)
    public ResponseEntity<Void>checkPermission(@RequestHeader String token){
        try{
            int id = tokenService.decryptJwtToken(token);
            userService.getById(id);
            return ResponseEntity.ok().build();
        }catch (JwtException | UserDoesNotExistsException exception){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }
}
