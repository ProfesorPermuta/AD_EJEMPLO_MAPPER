package com.permuta.ejemplo_mapper.djinn.service;

import com.permuta.ejemplo_mapper.djinn.dto.NewDjinnRequest;
import com.permuta.ejemplo_mapper.djinn.dto.DjinnResponse;
import com.permuta.ejemplo_mapper.djinn.mapper.DjinnMapper;
import com.permuta.ejemplo_mapper.djinn.model.Djinn;
import com.permuta.ejemplo_mapper.djinn.model.DjinnState;
import com.permuta.ejemplo_mapper.djinn.repository.DjinnRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DjinnService {

    private final DjinnRepository repository;
    private final DjinnMapper mapper;

    public List<DjinnResponse> findAll() {
        return mapper.toResponseList(repository.findAll());
    }

    public DjinnResponse create(NewDjinnRequest request) {
        Djinn djinn = mapper.toEntity(request, DjinnState.SET, LocalDateTime.now());
        return mapper.toResponse(repository.save(djinn));
    }

    // ---------------------------------------------------------------------
    // VERSIÓN ANTERIOR (sin mapper): todos los "new" a mano
    // ---------------------------------------------------------------------

    // public List<DjinnResponse> findAll() {
    //     List<DjinnResponse> responses = new ArrayList<>();
    //     for (Djinn djinn : repository.findAll()) {
    //         responses.add(new DjinnResponse(
    //                 djinn.getId(),
    //                 djinn.getName(),
    //                 djinn.getElement(),
    //                 djinn.getGame(),
    //                 djinn.getLocation(),
    //                 djinn.getEffect(),
    //                 djinn.getSummonPower(),
    //                 djinn.getState(),
    //                 djinn.getName() + " (" + djinn.getElement() + ")"));
    //     }
    //     return responses;
    // }
    //
    // public DjinnResponse create(NewDjinnRequest request) {
    //     Djinn djinn = new Djinn(
    //             null,
    //             request.name(),
    //             request.element(),
    //             request.game(),
    //             request.location(),
    //             request.effect(),
    //             request.summonPower(),
    //             DjinnState.SET,
    //             LocalDateTime.now());
    //     Djinn saved = repository.save(djinn);
    //     return new DjinnResponse(
    //             saved.getId(),
    //             saved.getName(),
    //             saved.getElement(),
    //             saved.getGame(),
    //             saved.getLocation(),
    //             saved.getEffect(),
    //             saved.getSummonPower(),
    //             saved.getState(),
    //             saved.getName() + " (" + saved.getElement() + ")");
    // }
}
