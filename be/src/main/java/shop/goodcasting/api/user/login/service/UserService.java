package shop.goodcasting.api.user.login.service;

import shop.goodcasting.api.user.login.domain.UserDTO;
import shop.goodcasting.api.user.login.domain.UserVO;

import java.util.Optional;

public interface UserService {
    String signup(UserDTO userDTO);
    UserDTO signin(UserDTO userDTO);
    UserDTO findById(Long id);
    Optional<UserVO> findByUsername(String username);

    default UserVO dto2Entity(UserDTO userDTO) {
        return UserVO.builder()
                .userId(userDTO.getUserId())
                .username(userDTO.getUsername())
                .password(userDTO.getPassword())
                .position(userDTO.getPosition())
                .roles(userDTO.getRoles())
                .build();
    }
    default UserDTO entity2Dto(UserVO userVO) {
        return UserDTO.builder()
                .userId(userVO.getUserId())
                .username(userVO.getUsername())
                .password(userVO.getPassword())
                .position(userVO.getPosition())
                .roles(userVO.getRoles())
                .build();
    }
}
