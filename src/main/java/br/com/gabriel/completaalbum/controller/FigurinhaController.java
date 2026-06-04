package br.com.gabriel.completaalbum.controller;

import br.com.gabriel.completaalbum.entity.Figurinha;
import br.com.gabriel.completaalbum.service.FigurinhaService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import br.com.gabriel.completaalbum.dto.ProgressoResponse;

import java.util.List;

@RestController
public class FigurinhaController {

    private final FigurinhaService service;

    public FigurinhaController(FigurinhaService service) {
        this.service = service;
    }

    @GetMapping("/figurinhas")
    public List<Figurinha> listarTodas() {
        return service.listarTodas();
    }

    @GetMapping("/figurinhas/obtidas")
    public List<Figurinha> listarObtidas() {
        return service.listarObtidas();
    }

    @GetMapping("/figurinhas/faltantes")
    public List<Figurinha> listarFaltantes() {
        return service.listarFaltantes();
    }

    @PatchMapping("/figurinhas/{codigo}")
    public Figurinha alternarObtida(
            @PathVariable String codigo
    ) {
        return service.alternarObtida(codigo);
    }

    @GetMapping("/figurinhas/progresso")
    public ProgressoResponse obterProgresso() {
        return service.obterProgresso();
    }

    @GetMapping("/figurinhas/{codigo}")
    public Figurinha buscarPorCodigo(
            @PathVariable String codigo
    ) {
        return service.buscarPorCodigo(codigo);
    }
}
