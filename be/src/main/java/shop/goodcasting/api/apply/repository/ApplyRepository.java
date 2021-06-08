package shop.goodcasting.api.apply.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import shop.goodcasting.api.apply.domain.Apply;

import java.util.List;

@Repository
public interface ApplyRepository extends JpaRepository<Apply, Long>, SearchApplyRepository {

    @Query("select a from Apply a where a.hire.hireId = :hireId")
    List<Apply> findAllByHireId(Long hireId);

    @Query("select a.profile.actor.actorId  from Apply a  inner join Producer on a.hire.producer.producerId = :producerId" )
    List<Apply> findAllByProducerId(Long producerId);

    @Query("select a.applyId from Apply a where a.profile.profileId = :profileId")
    Long findByProfileId(Long profileId);

    @Modifying
    @Query("delete from Apply a where a.hire.hireId = :hireId")
    void deleteByHireId(Long hireId);

    @Modifying
    @Query("delete from Apply a where a.profile.profileId = :profileId")
    void deleteByProfileId(Long profileId);

    @Query("select a.applyId from Apply a where a.profile.profileId = :profileId and a.hire.hireId = :hireId" )
    List<Long> duplicateCheck(Long profileId, Long hireId);
}
