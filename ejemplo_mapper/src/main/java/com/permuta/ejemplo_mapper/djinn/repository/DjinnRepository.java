package com.permuta.ejemplo_mapper.djinn.repository;

import com.permuta.ejemplo_mapper.djinn.model.Djinn;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class DjinnRepository {

    private final ConcurrentHashMap<Long, Djinn> store = new ConcurrentHashMap<>();
    private final AtomicLong sequence = new AtomicLong();

    public List<Djinn> findAll() {
        return new ArrayList<>(store.values());
    }

    public Djinn save(Djinn djinn) {
        djinn.setId(sequence.incrementAndGet());
        store.put(djinn.getId(), djinn);
        return djinn;
    }
}
