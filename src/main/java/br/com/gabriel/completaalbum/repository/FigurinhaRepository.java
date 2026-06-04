package br.com.gabriel.completaalbum.repository;

import br.com.gabriel.completaalbum.entity.Figurinha;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FigurinhaRepository
        extends JpaRepository<Figurinha, String> {

    List<Figurinha> findByObtida(Boolean obtida);

    List<Figurinha> findAllByOrderByOrdemAsc();
}
