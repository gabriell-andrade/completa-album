package br.com.gabriel.completaalbum.service;

import br.com.gabriel.completaalbum.entity.Figurinha;
import br.com.gabriel.completaalbum.repository.FigurinhaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FigurinhaService {

    private final FigurinhaRepository repository;

    public FigurinhaService(FigurinhaRepository repository) {
        this.repository = repository;
    }

    public List<Figurinha> listarTodas() {
        return repository.findAll();
    }

    public List<Figurinha> listarObtidas() {
        return repository.findByObtida(true);
    }

    public List<Figurinha> listarFaltantes() {
        return repository.findByObtida(false);
    }
}
