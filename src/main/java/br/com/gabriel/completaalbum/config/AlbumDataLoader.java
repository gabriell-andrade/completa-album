package br.com.gabriel.completaalbum.config;

import br.com.gabriel.completaalbum.entity.Figurinha;
import br.com.gabriel.completaalbum.repository.FigurinhaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Component
public class AlbumDataLoader implements CommandLineRunner {

    private final FigurinhaRepository repository;

    public AlbumDataLoader(FigurinhaRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {

        if (repository.count() > 0) {
            return;
        }

        carregarAlbum();
    }

    private void carregarAlbum() throws Exception {

        ClassPathResource resource =
                new ClassPathResource("checklist.txt");

        BufferedReader reader =
                new BufferedReader(
                        new InputStreamReader(
                                resource.getInputStream()
                        )
                );

        List<Figurinha> figurinhas = new ArrayList<>();

        int ordem = 1;

        String linha;

        while ((linha = reader.readLine()) != null) {

            linha = linha.trim();

            if (linha.isEmpty()) {
                continue;
            }

            String[] partes = linha.split("\\s+");

            String secao = partes[0];

            for (int i = 1; i < partes.length; i++) {

                figurinhas.add(
                        new Figurinha(
                                partes[i],
                                secao,
                                ordem++
                        )
                );
            }
        }

        repository.saveAll(figurinhas);

        reader.close();
    }
}
