package shop.goodcasting.api.user.login.controller;

import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.goodcasting.api.user.login.domain.UserDTO;
import shop.goodcasting.api.user.login.domain.UserVO;
import shop.goodcasting.api.user.login.service.UserServiceImpl;

import java.util.List;

@Api(tags="users")
@RestController
@RequestMapping("/users")
@CrossOrigin("*")
@RequiredArgsConstructor
public class UserController {
    private final UserServiceImpl userService;

    @PostMapping("/signup")
    @ApiOperation(value="${UserController.signup}")
    @ApiResponses(value={
            @ApiResponse(code=400, message = "something wrong"),
            @ApiResponse(code=403, message = "승인거절"),
            @ApiResponse(code=422, message = "중복된 username")})
    public ResponseEntity<String> signup(@ApiParam("Signup user") @RequestBody UserDTO userDTO){
        return ResponseEntity.ok(userService.signup(userDTO));
    }

    @PostMapping("/signin")
    @ApiOperation(value="${UserController.signin}")
    @ApiResponses(value={
            @ApiResponse(code=400, message = "something wrong"),
            @ApiResponse(code=422, message = "유효하지 않은 아이디 / 비밀번호")})
    public ResponseEntity<List<Object>> signin(@RequestBody UserDTO userDTO) {
        System.out.println(userDTO.getUserId());
        return ResponseEntity.ok(userService.signin(userDTO));
    }

    @GetMapping("/list")
    public ResponseEntity<List<UserVO>> userList(){
        return ResponseEntity.ok(userService.findAll());
    }
}