package br.com.gabriel.completaalbum.service;

import br.com.gabriel.completaalbum.entity.Figurinha;
import br.com.gabriel.completaalbum.repository.FigurinhaRepository;
import org.springframework.stereotype.Service;
import br.com.gabriel.completaalbum.dto.ProgressoResponse;

import java.util.List;

@Service
public class FigurinhaService {

    private final FigurinhaRepository repository;

    public FigurinhaService(FigurinhaRepository repository) {
        this.repository = repository;
    }

    public List<Figurinha> listarTodas() {
        return repository.findAllByOrderByOrdemAsc();
    }

    public List<Figurinha> listarObtidas() {
        return repository.findByObtida(true);
    }

    public List<Figurinha> listarFaltantes() {
        return repository.findByObtida(false);
    }

    public Figurinha alternarObtida(String codigo) {

        Figurinha figurinha = repository.findById(codigo)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Figurinha não encontrada: " + codigo
                        ));

        figurinha.setObtida(!figurinha.getObtida());

        return repository.save(figurinha);
    }

    public ProgressoResponse obterProgresso() {

        long obtidas = repository.countByObtida(true);

        long total = repository.count();

        long faltantes = total - obtidas;

        double percentual = (obtidas * 100.0) / total;

        return new ProgressoResponse(
                obtidas,
                faltantes,
                total,
                percentual
        );
    }

    public Figurinha buscarPorCodigo(String codigo) {

        return repository.findById(codigo)
                .orElseThrow(() -> new RuntimeException(
                        "Figurinha não encontrada: " + codigo
                ));
    }

    public List<Figurinha> listarPorSecao(String secao) {

        return repository.findBySecaoByOrdemAsc(secao);
    }
}
